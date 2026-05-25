using Backend.Models;
using Backend.Services;

namespace Backend.Agents
{
    public class EvaluatorAgent
    {
        private readonly GeminiService _geminiService;

        public EvaluatorAgent(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        public async Task<EvaluationResult> RunAsync(PlanningResult planning)
        {
            var planningJson = Newtonsoft.Json.JsonConvert.SerializeObject(planning);
            string prompt = $@"Critically evaluate each architectural approach provided in the plan. For each approach, provide a balanced list of at least 3 pros, 3 cons, technical complexity, cost estimation, and maintainability scores.
            Plan: {planningJson}
            
            IMPORTANT: Return ONLY a valid JSON object. Do NOT include markdown backticks.
            
            Return JSON matching this structure:
            {{
                ""evaluations"": [{{ 
                    ""option"": ""The approach title"",
                    ""pros"": [""Detailed pro 1"", ""Detailed pro 2"", ""Detailed pro 3""],
                    ""cons"": [""Detailed con 1"", ""Detailed con 2"", ""Detailed con 3""],
                    ""complexity"": ""Detailed complexity assessment"",
                    ""costEstimation"": ""Estimated budget and resource impact"",
                    ""maintainability"": ""Long-term maintenance outlook""
                }}]
            }}";

            return await _geminiService.GenerateJsonAsync<EvaluationResult>(prompt);
        }
    }
}
