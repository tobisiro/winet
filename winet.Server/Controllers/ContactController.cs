using Microsoft.AspNetCore.Mvc;
using winet.Server.Services;

namespace winet.Server.Controllers;

public class ContactFormRequest
{
    public string MenoPriezvisko { get; set; } = string.Empty;
    public string NazovSpolocnosti { get; set; } = string.Empty;
    public string AdresaSidlo { get; set; } = string.Empty;
    public string Posta { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Mobil { get; set; } = string.Empty;
    public string CisloOP { get; set; } = string.Empty;
    public string Program { get; set; } = string.Empty;
    public string Viazanost { get; set; } = string.Empty;
    public string Poznamka { get; set; } = string.Empty;
    public bool GdprSuhlas { get; set; }
    public string AltchaPayload { get; set; } = string.Empty; // This comes from ALTCHA
}

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AltchaService _altchaService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(AltchaService altchaService, ILogger<ContactController> logger)
    {
        _altchaService = altchaService;
        _logger = logger;
    }

    [HttpPost]
    public IActionResult SubmitForm([FromBody] ContactFormRequest request)
    {
        if (string.IsNullOrEmpty(request.AltchaPayload))
        {
            _logger.LogWarning("Odoslanie formulára zlyhalo - chýba ALTCHA payload.");
            return BadRequest(new { message = "Prosím potvrďte, že nie ste robot (chýba antispam kontrola)." });
        }

        bool isHuman = _altchaService.VerifyPayload(request.AltchaPayload);
        if (!isHuman)
        {
            _logger.LogWarning("Odoslanie formulára zlyhalo - nesprávny ALTCHA payload.");
            return BadRequest(new { message = "Antispam kontrola zlyhala. Skúste to prosím znova." });
        }

        // Sem by išla logika pre uloženie do databázy alebo odoslanie emailu...
        _logger.LogInformation("Prijatý a overený formulár od: {Email}, Program: {Program}", request.Email, request.Program);

        return Ok(new { message = "Formulár bol úspešne odoslaný." });
    }
}
