using Backend.Models;
using Backend.Services;

namespace Backend.Agents
{
    public class ReporterAgent
    {
        private readonly GeminiService _geminiService;

        public ReporterAgent(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        public async Task<RecommendationResult> RunAsync(EvaluationResult evaluation)
        {
            var evaluationJson = Newtonsoft.Json.JsonConvert.SerializeObject(evaluation);
            string prompt = $@"Synthesize the evaluation data into a professional executive recommendation. Select the best approach and provide a clear, evidence-based reasoning.
            Evaluation: {evaluationJson}
            
            IMPORTANT: Return ONLY a valid JSON object. Do NOT include markdown backticks.
            
            Return JSON matching this structure:
            {{
                ""recommendedOption"": ""Clear title of the selected approach"",
                ""confidence"": 95,
                ""reasoning"": ""Compelling, technical justification for why this option was chosen over alternatives."",
                ""executiveSummary"": ""A concise, professional summary of the findings and the strategic path forward (minimum 3 sentences).""
            }}";

            return await _geminiService.GenerateJsonAsync<RecommendationResult>(prompt);
        }
    }
}
