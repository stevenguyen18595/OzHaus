using OzHaus.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Allow case-insensitive property matching so JSON from frontend/backends with differing
    // naming conventions still binds correctly.
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    // Emit JSON using the C# property names (PascalCase) instead of the default camelCase
    // so clients expecting `Properties` will receive `Properties`.
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.DictionaryKeyPolicy = null;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "http://localhost:5174",
                "http://127.0.0.1:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Register services
builder.Services.AddHttpClient<IGovernmentApiService, GovernmentApiService>();
builder.Services.AddScoped<IAiService, AiService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

// Only use HTTPS redirection outside of development to avoid redirect warnings
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();