import {
  FaDog,
  FaHeart,
  FaWalking,
  FaShower,
  FaCarAlt,
  FaPaw,
  FaSun,
  FaSwimmingPool,
  FaGift,
  FaBirthdayCake,
  FaCalendarCheck,
  FaGlassCheers,
  FaBone,
  FaTag,
} from "react-icons/fa";
import type { IconType } from "react-icons";

/**
 * Icons a content entry can name in its frontmatter (`icon: dog`).
 * Rendered server-side only — no React ships to the client for these.
 */
export const ICONS = {
  dog: FaDog,
  heart: FaHeart,
  walk: FaWalking,
  shower: FaShower,
  car: FaCarAlt,
  paw: FaPaw,
  sun: FaSun,
  pool: FaSwimmingPool,
  gift: FaGift,
  cake: FaBirthdayCake,
  calendar: FaCalendarCheck,
  party: FaGlassCheers,
  bone: FaBone,
  tag: FaTag,
} satisfies Record<string, IconType>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as [IconName, ...IconName[]];

/** Tonal pairs for the icon tile when an entry has no cover image. */
export const TONES = {
  primary: "bg-primary/12 text-primary dark:bg-primary/20",
  secondary: "bg-secondary/12 text-secondary-dark dark:bg-secondary/20 dark:text-secondary",
  accent: "bg-accent/15 text-amber-700 dark:bg-accent/20 dark:text-accent",
  rose: "bg-rose-500/12 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  emerald: "bg-emerald-500/12 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  sky: "bg-sky-500/12 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400",
} as const;

export type ToneName = keyof typeof TONES;
export const TONE_NAMES = Object.keys(TONES) as [ToneName, ...ToneName[]];
