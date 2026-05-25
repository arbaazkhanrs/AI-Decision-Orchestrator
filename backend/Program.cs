using Backend.Agents;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient<GeminiService>();
builder.Services.AddScoped<AnalyzerAgent>();
builder.Services.AddScoped<PlannerAgent>();
builder.Services.AddScoped<EvaluatorAgent>();
builder.Services.AddScoped<ReporterAgent>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
