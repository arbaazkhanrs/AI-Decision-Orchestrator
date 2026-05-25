namespace Backend.Models
{
    public class AnalysisResult
    {
        public string Goal { get; set; } = "";
        public List<string> Constraints { get; set; } = new();
        public string Context { get; set; } = "";
    }

    public class Approach
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
    }

    public class PlanningResult
    {
        public List<Approach> Approaches { get; set; } = new();
        public List<string> Alternatives { get; set; } = new();
        public List<string> Strategies { get; set; } = new();
    }

    public class EvaluationItem
    {
        public string Option { get; set; } = "";
        public List<string> Pros { get; set; } = new();
        public List<string> Cons { get; set; } = new();
        public string Complexity { get; set; } = "";
        public string CostEstimation { get; set; } = "";
        public string Maintainability { get; set; } = "";
    }

    public class EvaluationResult
    {
        public List<EvaluationItem> Evaluations { get; set; } = new();
    }

    public class RecommendationResult
    {
        public string RecommendedOption { get; set; } = "";
        public int Confidence { get; set; }
        public string Reasoning { get; set; } = "";
        public string ExecutiveSummary { get; set; } = "";
    }
}
