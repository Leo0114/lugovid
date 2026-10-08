import React, { useState } from "react";
import { FaPaw, FaWhatsapp, FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

interface EventItem {
  id: string;
  category: "summer" | "party" | "training" | "social";
  title: string;
  date: string;
  time: string;
  location: string;
  badge: string;
  badgeColor: string;
  description: string;
  highlights: string[];
}

const EVENTS: EventItem[] = [
  {
    id: "summer-fest",
    category: "summer",
    title: "Summer Fest Canino Colima",
    date: "18 de Julio, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Instalaciones Lugo Vid, Colima",
    badge: "Evento Estrella",
    badgeColor: "bg-accent text-white",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    highlights: ["Alberca & tobogán para perritos", "Snack bar & helados caninos", "Concurso de destreza y mejor clavado", "Zona de hidratación & sombra"],
  },
  {
    id: "pool-party",
    category: "party",
    title: "Doggy Splash & Pool Day",
    date: "29 de Agosto, 2026",
    time: "11:00 AM - 3:00 PM",
    location: "Zona Acuática Lugo Vid, Colima",
    badge: "Muy Popular",
    badgeColor: "bg-secondary text-white",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    highlights: ["Juegos de pelota en agua", "Chalecos salvavidas para todos los tamaños", "Sesión de fotos acuáticas", "Premios y golosinas"],
  },
  {
    id: "halloween",
    category: "party",
    title: "Doggy Halloween & Pasarela de Disfraces",
    date: "31 de Octubre, 2026",
    time: "4:00 PM - 8:00 PM",
    location: "Jardín Principal Lugo Vid",
    badge: "Edición Especial",
    badgeColor: "bg-purple-600 text-white",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    highlights: ["Concurso de disfraces en pasarela", "Premios a la creatividad", "Dulces y galletitas caninas temáticas", "Música y ambiente familiar"],
  },
  {
    id: "social-fest",
    category: "social",
    title: "Tarde de Amigos & Picnic Perruno",
    date: "14 de Noviembre, 2026",
    time: "9:00 AM - 1:00 PM",
    location: "Parque Recreativo Lugo Vid",
    badge: "Convivencia",
    badgeColor: "bg-primary text-white",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
    highlights: ["Dinámicas de socialización guiada", "Área de agility recreativo", "Charlas de bienestar canino", "Bocadillos para humanos y perritos"],
  },
];

export default function EventsShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all" ? EVENTS : EVENTS.filter((e) => e.category === activeFilter);

  const handleRegister = (eventTitle: string) => {
    const text = encodeURIComponent(
      `¡Hola Lugo Vid! 🐾\nMe interesa registrar a mi perrito en el evento: "${eventTitle}".\n¿Podrían darme más detalles y asegurar mi lugar?`
    );
    window.open(`https://wa.me/523125938264?text=${text}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: "all", label: "Todos los Eventos 🐾" },
          { id: "summer", label: "☀️ Summer Fest" },
          { id: "party", label: "🎉 Fiestas & Pool" },
          { id: "social", label: "🐶 Convivencias" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeFilter === tab.id
                ? "bg-primary text-white shadow-md shadow-primary/30 scale-105"
                : "bg-panel text-muted hover:text-ink hover:bg-panel-alt border border-line"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-panel text-ink border border-line hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Background paw watermark */}
            <div className="pointer-events-none absolute -bottom-6 -right-6 text-neutral-100 text-8xl opacity-40 select-none group-hover:scale-110 transition-transform duration-500">
              🐾
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted font-medium">
                  <FaCalendarAlt className="text-primary" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-ink group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted mt-2 mb-4">
                <span className="flex items-center gap-1">
                  <FaClock className="text-secondary" />
                  {item.time}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-accent" />
                  {item.location}
                </span>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="space-y-2 mb-6 pt-4 border-t border-neutral-100">
                <span className="text-xs font-bold text-ink uppercase tracking-wider block mb-2">
                  Qué incluye la diversión:
                </span>
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-600">
                    <IoSparkles className="text-secondary shrink-0 text-sm" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleRegister(item.title)}
              className="w-full mt-4 py-3 px-5 rounded-2xl bg-neutral-900 hover:bg-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-primary/25 cursor-pointer"
            >
              <FaWhatsapp className="text-lg text-[#25D366]" />
              <span>Apartar lugar para mi perrito</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
