using Microsoft.AspNetCore.Mvc;
using winet.Server.Services;

namespace winet.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AltchaController : ControllerBase
{
    private readonly AltchaService _altchaService;

    public AltchaController(AltchaService altchaService)
    {
        _altchaService = altchaService;
    }

    [HttpGet("challenge")]
    public IActionResult GetChallenge()
    {
        var challenge = _altchaService.CreateChallenge();
        return Ok(challenge);
    }
}
