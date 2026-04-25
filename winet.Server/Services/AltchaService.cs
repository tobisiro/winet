using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace winet.Server.Services;

public class AltchaChallenge
{
    [JsonPropertyName("algorithm")]
    public string Algorithm { get; set; } = "SHA-256";

    [JsonPropertyName("challenge")]
    public string Challenge { get; set; } = string.Empty;

    [JsonPropertyName("salt")]
    public string Salt { get; set; } = string.Empty;

    [JsonPropertyName("maxnumber")]
    public int? MaxNumber { get; set; }

    [JsonPropertyName("signature")]
    public string Signature { get; set; } = string.Empty;
}

public class AltchaPayload
{
    [JsonPropertyName("algorithm")]
    public string Algorithm { get; set; } = string.Empty;

    [JsonPropertyName("challenge")]
    public string Challenge { get; set; } = string.Empty;

    [JsonPropertyName("number")]
    public int Number { get; set; }

    [JsonPropertyName("salt")]
    public string Salt { get; set; } = string.Empty;

    [JsonPropertyName("signature")]
    public string Signature { get; set; } = string.Empty;
}

public class AltchaService
{
    private readonly string _secret;
    private readonly Random _random = new Random();

    public AltchaService(IConfiguration config)
    {
        _secret = config["AltchaSecret"] ?? "DUMMY_SECRET_FOR_TESTING_123456789";
    }

    public AltchaChallenge CreateChallenge()
    {
        // Vytvorenie náhodného reťazca (salt) a tajného čísla (zložitosť hádanky)
        var saltChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var salt = new string(Enumerable.Repeat(saltChars, 12).Select(s => s[_random.Next(s.Length)]).ToArray());
        var number = _random.Next(50000, 150000); // PoW zložitosť

        var challengeData = salt + number;
        var challengeHash = ComputeSha256(challengeData);

        var challengeObj = new AltchaChallenge
        {
            Algorithm = "SHA-256",
            Challenge = challengeHash,
            Salt = salt,
            MaxNumber = 1000000,
            Signature = ComputeSignature(challengeHash)
        };
        
        return challengeObj;
    }

    public bool VerifyPayload(string payloadBase64)
    {
        try
        {
            var json = Encoding.UTF8.GetString(Convert.FromBase64String(payloadBase64));
            var payload = JsonSerializer.Deserialize<AltchaPayload>(json);

            if (payload == null || payload.Algorithm != "SHA-256") return false;

            // 1. Overenie podpisu servera
            var expectedSignature = ComputeSignature(payload.Challenge);
            if (payload.Signature != expectedSignature) return false;

            // 2. Overenie vyriešenia PoW hádanky
            var expectedChallenge = ComputeSha256(payload.Salt + payload.Number);
            if (expectedChallenge != payload.Challenge) return false;

            return true;
        }
        catch
        {
            return false;
        }
    }

    private string ComputeSha256(string data)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(data);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }

    private string ComputeSignature(string challenge)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_secret));
        var bytes = Encoding.UTF8.GetBytes(challenge);
        var hash = hmac.ComputeHash(bytes);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}
