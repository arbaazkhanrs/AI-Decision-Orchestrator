using Backend.Models;
using Backend.Services;

namespace Backend.Agents
{
    public class AnalyzerAgent
    {
        private readonly GeminiService _geminiService;

        public AnalyzerAgent(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        public async Task<AnalysisResult> RunAsync(string query)
        {
            string prompt = $@"Analyze the following decision query deeply. Extract specific goals, technical constraints, business requirements, and broader context.
            Query: {query}
            
            IMPORTANT: Return ONLY a valid JSON object. Do NOT include markdown backticks.
            
            Return JSON matching this structure:
            {{
                ""goal"": ""the primary goal as a single string"",
                ""constraints"": [""list"", ""of"", ""detected"", ""constraints""],
                ""context"": ""detailed description of the situation and requirements""
            }}";

            return await _geminiService.GenerateJsonAsync<AnalysisResult>(prompt);
        }
    }
}
