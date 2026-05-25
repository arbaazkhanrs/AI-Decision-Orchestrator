using Backend.Models;
using Backend.Services;

namespace Backend.Agents
{
    public class PlannerAgent
    {
        private readonly GeminiService _geminiService;

        public PlannerAgent(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        public async Task<PlanningResult> RunAsync(AnalysisResult analysis)
        {
            var analysisJson = Newtonsoft.Json.JsonConvert.SerializeObject(analysis);
            string prompt = $@"Based on the following analysis, generate a list of at least 3 distinct architectural approaches or strategies.
            Analysis: {analysisJson}
            
            IMPORTANT: Return ONLY a valid JSON object. Do NOT include markdown backticks.
            
            Return JSON matching this structure:
            {{
                ""approaches"": [
                    {{ ""title"": ""Primary Strategy"", ""description"": ""Detailed description of the approach"" }},
                    {{ ""title"": ""Alternative Strategy A"", ""description"": ""Detailed description"" }},
                    {{ ""title"": ""Alternative Strategy B"", ""description"": ""Detailed description"" }}
                ],
                ""alternatives"": [""concise list of alternative technologies""],
                ""strategies"": [""concise list of strategic implementation paths""]
            }}";

            return await _geminiService.GenerateJsonAsync<PlanningResult>(prompt);
        }
    }
}
