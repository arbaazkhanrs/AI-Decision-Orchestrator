namespace Backend.Models
{
    public class AgentResponse
    {
        public AnalysisResult Analysis { get; set; } = new();
        public PlanningResult Planning { get; set; } = new();
        public EvaluationResult Evaluation { get; set; } = new();
        public RecommendationResult Recommendation { get; set; } = new();
    }
}
