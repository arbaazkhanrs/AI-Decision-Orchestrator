using Backend.Agents;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly AnalyzerAgent _analyzer;
        private readonly PlannerAgent _planner;
        private readonly EvaluatorAgent _evaluator;
        private readonly ReporterAgent _reporter;

        public AgentsController(
            AnalyzerAgent analyzer,
            PlannerAgent planner,
            EvaluatorAgent evaluator,
            ReporterAgent reporter)
        {
            _analyzer = analyzer;
            _planner = planner;
            _evaluator = evaluator;
            _reporter = reporter;
        }

        [HttpPost("run")]
        public async Task<ActionResult<AgentResponse>> Run([FromBody] AgentRequest request)
        {
            if (string.IsNullOrEmpty(request.Query))
            {
                return BadRequest("Query is required");
            }

            try
            {
                // Step 1: Analyze
                var analysis = await _analyzer.RunAsync(request.Query);

                // Step 2: Plan
                var planning = await _planner.RunAsync(analysis);

                // Step 3: Evaluate
                var evaluation = await _evaluator.RunAsync(planning);

                // Step 4: Report
                var recommendation = await _reporter.RunAsync(evaluation);

                return Ok(new AgentResponse
                {
                    Analysis = analysis,
                    Planning = planning,
                    Evaluation = evaluation,
                    Recommendation = recommendation
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Orchestration failed", details = ex.Message });
            }
        }
    }
}
