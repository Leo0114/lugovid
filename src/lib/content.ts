import { getCollection, type CollectionEntry } from "astro:content";

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

/** One-off events whose date already passed stop showing on their own. */
const isUpcoming = (entry: CollectionEntry<"eventos">) => {
  const { frequency, date } = entry.data;
  if (frequency !== "unico" || !date) return true;
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay >= new Date();
};

const isValid = (entry: CollectionEntry<"ofertas">) =>
  !entry.data.validUntil || entry.data.validUntil >= new Date();

export const getServicios = async () => (await getCollection("servicios")).sort(byOrder);

export const getEventos = async () =>
  (await getCollection("eventos", (e) => e.data.active && isUpcoming(e))).sort(byOrder);

export const getOfertas = async () =>
  (await getCollection("ofertas", (o) => o.data.active && isValid(o))).sort(byOrder);

export const getHeroSlides = async () =>
  (await getCollection("hero", (s) => s.data.active)).sort(byOrder);

const inWindow = (entry: CollectionEntry<"avisos">, now = new Date()) =>
  (!entry.data.from || entry.data.from <= now) && (!entry.data.until || entry.data.until >= now);

export const getAvisos = async () =>
  (await getCollection("avisos", (a) => a.data.active && inWindow(a))).sort(byOrder);

export const FREQUENCY_LABEL: Record<CollectionEntry<"eventos">["data"]["frequency"], string> = {
  semanal: "Cada semana",
  mensual: "Cada mes",
  anual: "Una vez al año",
  unico: "Fecha especial",
};
