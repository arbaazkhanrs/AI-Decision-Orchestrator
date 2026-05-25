import { generateAgentJSON } from "../services/GeminiService";

export const AnalyzerAgent = {
  async run(query: string) {
    const prompt = `Analyze this decision query: "${query}". Return JSON: { "goal": "string", "goals": ["string"], "constraints": ["string"], "context": "string", "missingInfo": ["string"] }`;
    return await generateAgentJSON(prompt);
  }
};

export const PlannerAgent = {
  async run(analysis: any) {
    const prompt = `Based on this analysis: ${JSON.stringify(analysis)}, generate plans. Return JSON: { "approaches": [{ "title": "string", "description": "string" }], "alternatives": ["string"], "strategies": ["string"] }`;
    return await generateAgentJSON(prompt);
  }
};

export const EvaluatorAgent = {
  async run(planning: any) {
    const prompt = `Evaluate these plans: ${JSON.stringify(planning)}. Return JSON: { "evaluations": [{ "option": "string", "pros": ["string"], "cons": ["string"], "complexity": "string", "cost": "string", "maintainability": "string" }] }`;
    return await generateAgentJSON(prompt);
  }
};

export const ReporterAgent = {
  async run(evaluation: any) {
    const prompt = `Final report for: ${JSON.stringify(evaluation)}. Return JSON: { "executiveSummary": "string", "recommendedOption": "string", "recommendation": "string", "reasoning": "string", "confidence": 85 }`;
    return await generateAgentJSON(prompt);
  }
};
