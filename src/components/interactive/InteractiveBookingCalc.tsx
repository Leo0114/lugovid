import React, { useState } from "react";
import { FaWhatsapp, FaPaw, FaDog, FaShower, FaCarAlt, FaWalking, FaHeart } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  description: string;
}

const SERVICES: ServiceOption[] = [
  {
    id: "guarderia",
    name: "Guardería Canina",
    icon: <FaDog className="text-xl" />,
    basePrice: 180,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "pension",
    name: "Pensión Canina",
    icon: <FaHeart className="text-xl" />,
    basePrice: 280,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    id: "paseos",
    name: "Paseos & Ejercicio",
    icon: <FaWalking className="text-xl" />,
    basePrice: 120,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  },
  {
    id: "banos",
    name: "Baños & Spa",
    icon: <FaShower className="text-xl" />,
    basePrice: 220,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
  },
  {
    id: "transporte",
    name: "Transporte Canino",
    icon: <FaCarAlt className="text-xl" />,
    basePrice: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "diversion",
    name: "Mucha Diversión (Full)",
    icon: <FaPaw className="text-xl" />,
    basePrice: 350,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lorem ante, dapibus in viverra quis, feugiat a tellus.",
  },
];

const DOG_SIZES = [
  { id: "s", name: "Chico", sub: "Hasta 10kg", multiplier: 1 },
  { id: "m", name: "Mediano", sub: "10kg - 25kg", multiplier: 1.15 },
  { id: "l", name: "Grande", sub: "25kg - 40kg", multiplier: 1.3 },
  { id: "xl", name: "Gigante", sub: "+40kg", multiplier: 1.45 },
];

export default function InteractiveBookingCalc() {
  const [selectedService, setSelectedService] = useState<string>("guarderia");
  const [selectedSize, setSelectedSize] = useState<string>("m");
  const [days, setDays] = useState<number>(3);
  const [withBath, setWithBath] = useState<boolean>(false);
  const [withTransport, setWithTransport] = useState<boolean>(false);
  const [dogName, setDogName] = useState<string>("");

  const currentService = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const currentSizeObj = DOG_SIZES.find((s) => s.id === selectedSize) || DOG_SIZES[1];

  const estimatedBase = Math.round(currentService.basePrice * currentSizeObj.multiplier * days);
  const extrasTotal = (withBath ? 200 : 0) + (withTransport ? 120 : 0);
  const total = estimatedBase + extrasTotal;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Lugo Vid! 🐾\nMe gustaría reservar con los siguientes datos:\n- Perrito: ${dogName || "Mi mascota"}\n- Servicio: ${currentService.name}\n- Tamaño: ${currentSizeObj.name} (${currentSizeObj.sub})\n- Duración: ${days} ${days === 1 ? "día/sesión" : "días/sesiones"}\n${withBath ? "- Extra: Incluir Baño & Spa 🛁\n" : ""}${withTransport ? "- Extra: Incluir Transporte redondo 🚐\n" : ""}\nEstimado aproximado: $${total} MXN\n\n¿Tienen disponibilidad? ¡Muchas gracias!`
    );
    window.open(`https://wa.me/523125938264?text=${text}`, "_blank");
  };

  return (
    <div className="w-full bg-panel text-ink rounded-3xl p-6 md:p-10 shadow-xl border border-line">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <FaPaw className="animate-paw" />
            <span>Cotizador & Reserva Inteligente</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-ink">
            Personaliza la experiencia para tu perrito
          </h3>
          <p className="text-sm text-muted mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/20">
          <span className="text-xs text-primary font-medium">Atención directa:</span>
          <span className="text-xs font-bold text-primary">Por WhatsApp</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left selector options */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-3">
              1. Selecciona el servicio principal
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SERVICES.map((serv) => {
                const active = serv.id === selectedService;
                return (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => setSelectedService(serv.id)}
                    className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      active
                        ? "border-primary bg-primary/10 text-primary shadow-sm ring-2 ring-primary/20"
                        : "border-line bg-canvas hover:border-primary/40 text-neutral-700"
                    }`}
                  >
                    <span className={`p-2.5 rounded-full mb-2 ${active ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600"}`}>
                      {serv.icon}
                    </span>
                    <span className="text-xs font-bold leading-tight">{serv.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dog Size */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-3">
              2. Tamaño de tu mascota
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {DOG_SIZES.map((size) => {
                const active = size.id === selectedSize;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      active
                        ? "border-secondary bg-secondary/10 text-secondary ring-2 ring-secondary/20 font-bold"
                        : "border-line bg-canvas hover:border-secondary/40 text-neutral-700 font-medium"
                    }`}
                  >
                    <div className="text-sm font-bold">{size.name}</div>
                    <div className="text-[11px] text-muted">{size.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Days Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted">
                3. Duración (Días o Sesiones)
              </label>
              <span className="text-sm font-bold text-primary px-3 py-0.5 rounded-full bg-primary/10">
                {days} {days === 1 ? "día" : "días"}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              <span>1 día</span>
              <span>15 días</span>
              <span>30 días (Mes)</span>
            </div>
          </div>

          {/* Step 4: Optional extras */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-3">
              4. Servicios adicionales recomendados
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                withBath ? "border-primary bg-primary/5" : "border-line bg-canvas"
              }`}>
                <input
                  type="checkbox"
                  checked={withBath}
                  onChange={(e) => setWithBath(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-ink block">Baño & Spa de salida</span>
                  <span className="text-[11px] text-muted">+ $200 MXN</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                withTransport ? "border-primary bg-primary/5" : "border-line bg-canvas"
              }`}>
                <input
                  type="checkbox"
                  checked={withTransport}
                  onChange={(e) => setWithTransport(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-ink block">Transporte redondo en Colima</span>
                  <span className="text-[11px] text-muted">+ $120 MXN</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right estimation summary card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-br from-neutral-50 to-primary/5 border border-primary/20 shadow-md">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
              <MdOutlineDateRange className="text-lg" />
              <span>Resumen de tu Cotización</span>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-ink mb-1.5">
                Nombre de tu mascota (opcional):
              </label>
              <input
                type="text"
                placeholder="Ej. Rocky, Luna, Milo..."
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-3 pt-2 pb-4 border-y border-line text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted">Servicio:</span>
                <span className="font-bold text-ink">{currentService.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Tamaño:</span>
                <span className="font-semibold text-ink">{currentSizeObj.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Tiempo estimado:</span>
                <span className="font-semibold text-ink">{days} días</span>
              </div>
              {withBath && (
                <div className="flex justify-between items-center text-secondary">
                  <span>+ Baño & Spa</span>
                  <span>+$200 MXN</span>
                </div>
              )}
              {withTransport && (
                <div className="flex justify-between items-center text-secondary">
                  <span>+ Transporte</span>
                  <span>+$120 MXN</span>
                </div>
              )}
            </div>

            <div className="my-5 p-4 rounded-2xl bg-white border border-primary/20 flex items-center justify-between">
              <div>
                <span className="block text-xs text-muted font-medium">Estimado Total</span>
                <span className="text-2xl md:text-3xl font-extrabold text-primary">
                  ${total.toLocaleString("es-MX")} <span className="text-xs font-normal text-muted">MXN</span>
                </span>
              </div>
              <span className="text-[11px] text-secondary font-bold bg-secondary/10 px-2.5 py-1 rounded-full">
                ¡Sin sorpresas!
              </span>
            </div>

            <p className="text-[11px] text-muted italic mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm md:text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
