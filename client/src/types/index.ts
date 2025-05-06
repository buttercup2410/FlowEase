export interface Product {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "tampons" | "pads" | "cups" | "period-underwear";
  flowTypes: ("light" | "moderate" | "heavy" | "variable")[];
  isEcoCertified: boolean;
  popularity: number;
  ecoRating: number;
  unit: string;
}
