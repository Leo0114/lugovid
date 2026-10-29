/**
 * Pricing rules shared by the calculator, <PricingSection> and every card,
 * so a price only ever changes in one place: the entry's `price` frontmatter
 * plus the size and extra tables below. All amounts are MXN.
 */

export interface DogSize {
  id: string;
  name: string;
  weight: string;
  multiplier: number;
}

export const DOG_SIZES: DogSize[] = [
  { id: "s", name: "Chico", weight: "Hasta 10 kg", multiplier: 1 },
  { id: "m", name: "Mediano", weight: "10 a 25 kg", multiplier: 1.15 },
  { id: "l", name: "Grande", weight: "25 a 40 kg", multiplier: 1.3 },
  { id: "xl", name: "Gigante", weight: "Más de 40 kg", multiplier: 1.45 },
];

export interface Extra {
  id: string;
  label: string;
  amount: number;
}

export const EXTRAS: Extra[] = [
  { id: "bano", label: "Baño y spa de salida", amount: 200 },
  { id: "transporte", label: "Transporte redondo en Colima", amount: 120 },
];

/** Rounded to the nearest $5 so derived size prices read like real prices. */
export const priceForSize = (amount: number, size: DogSize) =>
  Math.round((amount * size.multiplier) / 5) * 5;

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export const formatMXN = (amount: number) => mxn.format(amount);

export interface PriceLike {
  amount: number;
  unit: string;
  from?: boolean;
}

/** "Desde $180 / día" or "$150 / perrito". */
export const priceLabel = ({ amount, unit, from = true }: PriceLike) =>
  `${from ? "Desde " : ""}${formatMXN(amount)} / ${unit}`;

/** Spanish plural for price units: día → días, sesión → sesiones. */
export const pluralUnit = (unit: string, n: number) => {
  if (n === 1) return unit;
  if (unit.endsWith("ón")) return `${unit.slice(0, -2)}ones`;
  return /[aeiouáéíóú]$/i.test(unit) ? `${unit}s` : `${unit}es`;
};
