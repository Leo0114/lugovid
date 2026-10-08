import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { IoClose, IoPaw } from "react-icons/io5";

export default function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = "3125938264";
  const defaultMsg = encodeURIComponent("¡Hola! Me gustaría cotizar y pedir informes sobre sus servicios en la Guardería Canina Lugo Vid.");
  const waUrl = `https://wa.me/52${phone}?text=${defaultMsg}`;

  const socials = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl" />,
      url: waUrl,
      bg: "bg-primary hover:bg-primary-dark text-white",
      label: "Escríbenos directamente",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      url: "https://www.instagram.com/lugo.vid/",
      bg: "bg-secondary hover:bg-secondary-dark text-white",
      label: "@lugo.vid",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-xl" />,
      url: "https://www.tiktok.com/@lugovid2021",
      bg: "bg-primary hover:bg-primary-dark text-white",
      label: "@lugovid2021",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-xl" />,
      url: "https://www.facebook.com/p/Lugovid-100089677875237/",
      bg: "bg-secondary hover:bg-secondary-dark text-white",
      label: "Lugovid en Facebook",
    },
    {
      name: "Llamada Directa",
      icon: <FaPhoneAlt className="text-base" />,
      url: `tel:${phone}`,
      bg: "bg-primary hover:bg-primary-dark text-white",
      label: "Llamar a recepción",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 flex flex-col items-end gap-3 select-none">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 mb-2 bg-panel/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-line animate-in fade-in slide-in-from-bottom-4 duration-200 min-w-[240px]">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-line text-xs font-bold text-primary uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <IoPaw className="text-secondary text-sm" />
              <span>Atención Inmediata</span>
            </span>
            <span className="text-[10px] text-muted font-normal">🐾 Lugo Vid</span>
          </div>

          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-panel-alt transition-all duration-200 group text-ink hover:text-primary"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-110 ${social.bg}`}>
                {social.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-ink group-hover:text-primary">{social.name}</span>
                <span className="text-[11px] text-muted">{social.label}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Main trigger button */}
      <div className="relative group flex items-center justify-end">
        {!isOpen && (
          <span className="hidden md:inline-block mr-3 bg-panel/90 border border-line text-ink text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            Atención Inmediata 🐾
          </span>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir canales de contacto y atención inmediata"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/80 dark:border-panel"
        >
          {isOpen ? (
            <IoClose className="text-2xl" />
          ) : (
            <div className="flex items-center gap-2">
              <IoPaw className="text-lg text-white animate-paw" />
              <span>Atención Inmediata</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
