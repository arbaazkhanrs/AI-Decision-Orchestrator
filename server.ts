import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { AnalyzerAgent, PlannerAgent, EvaluatorAgent, ReporterAgent } from "./src/server/agents/index";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint (Matches .NET structure)
  app.post("/api/agents/run", async (req, res) => {
    try {
      const { query } = req.body;
      const analysis = await AnalyzerAgent.run(query);
      const planning = await PlannerAgent.run(analysis);
      const evaluation = await EvaluatorAgent.run(planning);
      const recommendation = await ReporterAgent.run(evaluation);

      res.json({
        analysis,
        planning,
        evaluation,
        recommendation
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => res.sendFile(path.join(process.cwd(), 'dist/index.html')));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Preview server running on port ${PORT}`);
  });
}

startServer();
