import { TPriceRange } from "@/types/priceRangeType";

export const priceRanges: TPriceRange[] = [
  { label: "TK:0 - TK:60", min: 0, max: 60 },
  { label: "TK:60 - TK:300", min: 60, max: 300 },
  { label: "TK:300 - TK:800", min: 300, max: 800 },
  { label: "Above TK:800", min: 800, max: null },
];
