var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSingleton<winet.Server.Services.AltchaService>();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Health check endpoint for container verification
app.MapGet("/health", () => "Server is running!");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
else 
{
    // Only use HTTPS redirection if NOT running in Docker
    // In Docker, SSL termination is typically handled by a reverse proxy
    if (Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") != "true")
    {
        app.UseHttpsRedirection();
    }
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
