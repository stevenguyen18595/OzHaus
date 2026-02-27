using Microsoft.AspNetCore.Mvc;
using OzHaus.Api.Models;
using OzHaus.Api.Services;

namespace OzHaus.Api.Controllers;

[ApiController]
[Route("api/report")]
public class HousingController : ControllerBase
{
    private readonly ILogger<HousingController> _logger;
    private readonly IGovernmentApiService _governmentApiService;
    private readonly IAiService _aiService;

    public HousingController(
        ILogger<HousingController> logger,
        IGovernmentApiService governmentApiService,
        IAiService aiService)
    {
        _logger = logger;
        _governmentApiService = governmentApiService;
        _aiService = aiService;
    }

    [HttpGet()]
    public async Task<ActionResult<HousingReport>> GetReport()
    {
        try
        {
            _logger.LogInformation("Generating housing report");

            // Fetch data from government APIs
            var properties = await _governmentApiService.FetchHousingDataAsync();

            // Generate AI insights for each property
            foreach (var property in properties)
            {
                property.AiInsights = await _aiService.GenerateInsightsAsync(property);
            }

            var report = new HousingReport
            {
                Properties = properties
            };

            return Ok(report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating housing report");
            return StatusCode(500, "An error occurred while generating the housing report");
        }
    }
}
