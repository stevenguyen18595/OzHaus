// TypeScript models generated from C# backend models (HousingModels.cs)

export interface HousingProperty {
  Address: string;
  Price: number;
  Type: string;
  Bedrooms: number;
  Bathrooms: number;
  AiInsights?: string;
}

export interface HousingReport {
  Properties: HousingProperty[];
  GeneratedAt: string; // ISO date string
}
