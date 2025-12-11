namespace OzHaus.Api.Models;

public class HousingProperty
{
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Type { get; set; } = string.Empty;
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public string? AiInsights { get; set; }
}

public class HousingReport
{
    public List<HousingProperty> Properties { get; set; } = new();
    public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
}
