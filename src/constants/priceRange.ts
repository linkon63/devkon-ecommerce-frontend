import { TPriceRange } from "@/types/priceRangeType";

export const priceRanges: TPriceRange[] = [
  { label: "$0 - $60", min: 0, max: 60 },
  { label: "$60 - $300", min: 60, max: 300 },
  { label: "$300 - $800", min: 300, max: 800 },
  { label: "Above $800", min: 800, max: null },
];
