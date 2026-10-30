import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { ICONS, type IconName } from "@/lib/icons";
import {
  DOG_SIZES,
  EXTRAS,
  HAIR_LENGTHS,
  extraPrice,
  formatMXN,
  pluralUnit,
  tariffPrice,
  tariffUsesHair,
  type HairLength,
  type Tariff,
} from "@/lib/pricing";
import { waLink } from "@/lib/contact";

/** Serializable slice of a `servicios` entry, passed in from Astro. */
export interface QuoteService {
  id: string;
  title: string;
  icon: IconName;
  amount: number;
  unit: string;
  /** Real per-size rates; without it `amount` is a flat price. */
  tariff?: Tariff;
}

interface Props {
  services: QuoteService[];
  defaultServiceId?: string;
}

const MAX_DAYS = 30;

export default function InteractiveBookingCalc({ services, defaultServiceId }: Props) {
  const [serviceId, setServiceId] = useState(defaultServiceId ?? services[0]?.id);
  const [sizeId, setSizeId] = useState(DOG_SIZES[2].id);
  const [hair, setHair] = useState<HairLength>("corto");
  const [days, setDays] = useState(3);
  const [extras, setExtras] = useState<Set<string>>(new Set());
  const [dogName, setDogName] = useState("");

  const service = services.find((s) => s.id === serviceId) ?? services[0];
  const size = DOG_SIZES.find((s) => s.id === sizeId) ?? DOG_SIZES[0];
  // A bath is no extra when the service already is one.
  const offeredExtras = useMemo(
    () => EXTRAS.filter((e) => !e.tariff || e.tariff !== service?.tariff),
    [service?.tariff],
  );
  const chosenExtras = offeredExtras.filter((e) => extras.has(e.id));

  if (!service) return null;

  const sizeMatters = Boolean(service.tariff) || chosenExtras.some((e) => e.tariff);
  const hairMatters =
    (service.tariff !== undefined && tariffUsesHair(service.tariff)) ||
    chosenExtras.some((e) => e.tariff && tariffUsesHair(e.tariff));
  const hairName = HAIR_LENGTHS.find((h) => h.id === hair)!.name;

  const unitPrice = service.tariff ? tariffPrice(service.tariff, size, hair) : service.amount;
  const priced = chosenExtras.map((e) => ({ ...e, price: extraPrice(e, size, hair) }));
  const total = unitPrice * days + priced.reduce((sum, e) => sum + e.price, 0);

  const toggleExtra = (id: string) =>
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const plural = (n: number) => pluralUnit(service.unit, n);

  const message = [
    "Hola Lugo Vid, me gustaría reservar:",
    `- Perrito: ${dogName.trim() || "Mi mascota"}`,
    `- Servicio: ${service.title}`,
    ...(sizeMatters ? [`- Tamaño: ${size.name} (${size.weight})`] : []),
    ...(hairMatters ? [`- Pelo: ${hairName.toLowerCase()}`] : []),
    `- Duración: ${days} ${plural(days)}`,
    ...priced.map((e) => `- Extra: ${e.label} (${formatMXN(e.price)})`),
    `Estimado: ${formatMXN(total)} MXN`,
    "¿Tienen disponibilidad?",
  ].join("\n");

  const legend = "mb-3 text-[13px] font-semibold text-ink";
  const option = "press cursor-pointer rounded-2xl border text-center transition-colors";
  const optionIdle = "border-line bg-canvas text-ink hover:border-primary/50";
  const optionOn = "border-primary bg-primary/10 text-primary-ink ring-2 ring-primary/20";

  return (
    <div className="w-full rounded-3xl bg-panel p-6 text-ink shadow-e2 ring-1 ring-line md:p-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-7 lg:col-span-7">
          <fieldset>
            <legend className={legend}>1. Servicio</legend>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {services.map((s) => {
                const on = s.id === service.id;
                const Icon = ICONS[s.icon];
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setServiceId(s.id)}
                    className={`${option} flex flex-col items-center justify-center p-3.5 ${on ? optionOn : optionIdle}`}
                  >
                    <span className={`mb-2 rounded-full p-2.5 ${on ? "bg-primary-dark text-white" : "bg-panel-alt text-muted"}`}>
                      <Icon className="text-xl" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold leading-tight">{s.title}</span>
                    <span className="mt-0.5 text-[11px] tabular-nums text-muted">
                      {s.tariff && "Desde "}
                      {formatMXN(s.amount)} / {s.unit}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset disabled={!sizeMatters} className="disabled:opacity-50">
            <legend className={legend}>
              2. Tamaño de tu perrito
              {!sizeMatters && <span className="ml-2 font-normal text-muted">(no cambia el precio)</span>}
            </legend>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
              {DOG_SIZES.map((s) => {
                const on = s.id === size.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSizeId(s.id)}
                    className={`${option} px-2 py-3 disabled:cursor-not-allowed ${on ? optionOn : optionIdle}`}
                  >
                    <span className="block text-sm font-bold leading-tight">{s.name}</span>
                    <span className="block text-[11px] text-muted">{s.weight}</span>
                    {service.tariff && (
                      <span className="mt-1 block text-xs font-semibold tabular-nums">
                        {formatMXN(tariffPrice(service.tariff, s, hair))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {hairMatters && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs text-muted">Pelo</span>
                <div role="group" aria-label="Largo del pelo" className="inline-flex rounded-full bg-panel-alt p-1 ring-1 ring-line">
                  {HAIR_LENGTHS.map((h) => {
                    const on = h.id === hair;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setHair(h.id)}
                        className={`press rounded-full px-4 py-1.5 text-xs font-semibold ${
                          on ? "bg-panel text-primary-ink shadow-e1" : "text-muted hover:text-ink"
                        }`}
                      >
                        {h.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </fieldset>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="calc-days" className="text-[13px] font-semibold text-ink">
                3. Duración
              </label>
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-bold tabular-nums text-primary-ink">
                {days} {plural(days)}
              </span>
            </div>
            <input
              id="calc-days"
              type="range"
              min={1}
              max={MAX_DAYS}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-panel-alt accent-primary"
            />
            <div className="mt-1 flex justify-between text-[11px] tabular-nums text-muted">
              <span>1</span>
              <span>15</span>
              <span>{MAX_DAYS}</span>
            </div>
          </div>

          <fieldset>
            <legend className={legend}>4. Extras</legend>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {offeredExtras.map((e) => {
                const on = extras.has(e.id);
                return (
                  <label
                    key={e.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-colors ${
                      on ? "border-primary bg-primary/10" : "border-line bg-canvas hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleExtra(e.id)}
                      className="h-4 w-4 rounded accent-primary"
                    />
                    <span className="text-left">
                      <span className="block text-xs font-bold text-ink">{e.label}</span>
                      <span className="text-[11px] tabular-nums text-muted">+ {formatMXN(extraPrice(e, size, hair))}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <aside
          aria-live="polite"
          className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-panel-alt to-primary/10 p-6 ring-1 ring-primary/20 md:p-8 lg:col-span-5"
        >
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-primary-ink">
              <MdOutlineDateRange className="text-lg" aria-hidden="true" />
              Resumen de tu cotización
            </h3>

            <label htmlFor="calc-dog" className="mb-1.5 block text-xs font-semibold text-ink">
              Nombre de tu perrito (opcional)
            </label>
            <input
              id="calc-dog"
              type="text"
              autoComplete="off"
              placeholder="Ej. Rocky, Luna, Milo"
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              className="mb-4 w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <dl className="space-y-3 border-y border-line py-4 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Servicio</dt>
                <dd className="font-bold text-ink">{service.title}</dd>
              </div>
              {sizeMatters && (
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Tamaño</dt>
                  <dd className="text-right font-semibold text-ink">
                    {size.name}
                    {hairMatters && <span className="font-normal text-muted"> · {hairName.toLowerCase()}</span>}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Precio por {service.unit}</dt>
                <dd className="font-semibold tabular-nums text-ink">{formatMXN(unitPrice)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">Cantidad</dt>
                <dd className="font-semibold tabular-nums text-ink">× {days}</dd>
              </div>
              {priced.map((e) => (
                <div key={e.id} className="flex justify-between gap-3 text-secondary-ink">
                  <dt>{e.label}</dt>
                  <dd className="tabular-nums">+ {formatMXN(e.price)}</dd>
                </div>
              ))}
            </dl>

            <div className="my-5 rounded-2xl bg-panel p-4 ring-1 ring-primary/20">
              <span className="block text-xs font-medium text-muted">Estimado total</span>
              <span className="text-3xl font-extrabold tabular-nums tracking-tight text-primary-ink">
                {formatMXN(total)} <span className="text-xs font-normal text-muted">MXN</span>
              </span>
            </div>

            <p className="mb-4 text-[11px] text-muted">
              Precio de referencia. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="press flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-bold text-[#06361b] transition-colors hover:bg-[#2ee072] md:text-base"
          >
            <FaWhatsapp className="text-2xl" aria-hidden="true" />
            Consultar por WhatsApp
          </a>
        </aside>
      </div>
    </div>
  );
}
