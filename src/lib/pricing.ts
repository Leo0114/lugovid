/**
 * Pricing rules shared by the calculator, <PricingSection> and every card.
 * Guardería, pensión and baños read their real rates from the table in
 * src/constants/pricing.ts; any other service uses the flat `price.amount`
 * in its frontmatter. All amounts are MXN.
 */
import { lugovidPricing, type ServicePrice } from "../constants/pricing";

export type Tariff = ServicePrice["category"];
export type SizeKey = ServicePrice["size"];
export type HairLength = NonNullable<ServicePrice["hairLength"]>;

/** Tuple for z.enum in content.config.ts: `price.tariff` in frontmatter. */
export const TARIFF_NAMES = ["guarderia", "pension", "baños"] as const satisfies readonly Tariff[];

export interface DogSize {
  id: string;
  key: SizeKey;
  name: string;
  weight: string;
}

const SIZE_META: { id: string; key: SizeKey; name: string }[] = [
  { id: "xs", key: "Extra CH", name: "Extra chico" },
  { id: "s", key: "Chico", name: "Chico" },
  { id: "m", key: "Mediano", name: "Mediano" },
  { id: "l", key: "Grande", name: "Grande" },
  { id: "xl", key: "Extra Grande", name: "Extra grande" },
];

/** Smallest to largest; the weight range comes from the price table. */
export const DOG_SIZES: DogSize[] = SIZE_META.map((meta) => {
  const row = lugovidPricing.find((p) => p.size === meta.key);
  if (!row) throw new Error(`pricing: no rates for size "${meta.key}"`);
  return { ...meta, weight: row.weightRange };
});

export const HAIR_LENGTHS: { id: HairLength; name: string }[] = [
  { id: "corto", name: "Pelo corto" },
  { id: "largo", name: "Pelo largo" },
];

const rowsFor = (tariff: Tariff) => lugovidPricing.filter((p) => p.category === tariff);

/** Baños charge by coat length; guardería and pensión don't. */
export const tariffUsesHair = (tariff: Tariff) => rowsFor(tariff).some((p) => p.hairLength);

/** Lowest rate of a tariff, used for "Desde $…". */
export const tariffFrom = (tariff: Tariff) => Math.min(...rowsFor(tariff).map((p) => p.price));

/** Exact rate for a size (and coat, when the tariff charges by it). */
export const tariffPrice = (tariff: Tariff, size: DogSize, hair: HairLength = "corto") => {
  const usesHair = tariffUsesHair(tariff);
  const row = rowsFor(tariff).find((p) => p.size === size.key && (!usesHair || p.hairLength === hair));
  if (!row) throw new Error(`pricing: no ${tariff} rate for ${size.key}${usesHair ? ` / ${hair}` : ""}`);
  return row.price;
};

export interface Extra {
  id: string;
  label: string;
  /** Priced from the table by size and coat. */
  tariff?: Tariff;
  amount?: number;
}

export const EXTRAS: Extra[] = [
  { id: "bano", label: "Baño de salida", tariff: "baños" },
  { id: "transporte", label: "Transporte redondo en Colima", amount: 120 },
];

export const extraPrice = (extra: Extra, size: DogSize, hair: HairLength) =>
  extra.tariff ? tariffPrice(extra.tariff, size, hair) : (extra.amount ?? 0);

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
