import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ICON_NAMES, TONE_NAMES } from "./lib/icons";

/**
 * Every collection lives in `src/content/<name>/*.md`.
 * The file name is the entry id and doubles as its URL slug.
 *
 * Images (`cover`) are paths relative to the .md file, e.g.
 * `../../assets/images/servicios/guarderia.jpg`. `gallery` is a folder name
 * inside `src/assets/` that the shared <Gallery> component reads.
 */

const servicios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servicios" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line for cards. Long copy goes in the markdown body. */
      summary: z.string().max(140),
      badge: z.string().optional(),
      icon: z.enum(ICON_NAMES).default("paw"),
      tone: z.enum(TONE_NAMES).default("primary"),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.string().optional(),
      schedule: z.string().optional(),
      includes: z.array(z.string()).default([]),
      /** Shown on the home page. */
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

const eventos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(140),
      /** Toggle off to hide the event everywhere without deleting it. */
      active: z.boolean().default(true),
      frequency: z.enum(["semanal", "mensual", "anual", "unico"]).default("unico"),
      /** Human-readable "when": "Sábados 10:00 – 13:00", "Último domingo del mes"… */
      when: z.string(),
      /** Optional exact date; one-off events past this date hide themselves. */
      date: z.coerce.date().optional(),
      location: z.string().optional(),
      badge: z.string().optional(),
      icon: z.enum(ICON_NAMES).default("party"),
      tone: z.enum(TONE_NAMES).default("accent"),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

const ofertas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ofertas" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(120),
      active: z.boolean().default(true),
      weekly: z.boolean().default(false),
      /** Free text so it can read "$180", "2×1" or "-20%". */
      price: z.string().optional(),
      priceNote: z.string().optional(),
      validUntil: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string().optional(),
      /** Prefilled WhatsApp message; defaults to asking about the offer. */
      message: z.string().optional(),
      order: z.number().default(99),
    }),
});

const hero = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hero" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      text: z.string().max(180),
      /** Short period tag: "Esta semana", "Octubre"… */
      tag: z.string().optional(),
      active: z.boolean().default(true),
      cover: image(),
      coverAlt: z.string().default(""),
      cta: z.object({ label: z.string(), href: z.string() }),
      secondary: z.object({ label: z.string(), href: z.string() }).optional(),
      order: z.number().default(99),
    }),
});

const avisos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/avisos" }),
  schema: z.object({
    text: z.string().max(140),
    active: z.boolean().default(true),
    /** info: brand blue · promo: orange accent · alerta: closures, schedule changes. */
    tone: z.enum(["info", "promo", "alerta"]).default("info"),
    link: z.object({ label: z.string(), href: z.string() }).optional(),
    /** Optional window; outside it the notice hides on its own. */
    from: z.coerce.date().optional(),
    until: z.coerce.date().optional(),
    dismissible: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { servicios, eventos, ofertas, hero, avisos };
