import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { IoClose, IoPaw } from "react-icons/io5";

export default function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);

  const phone = "3125938264";
  const defaultMsg = encodeURIComponent("¡Hola! Me gustaría cotizar y pedir informes sobre sus servicios en la Guardería Canina.");
  const waUrl = `https://wa.me/52${phone}?text=${defaultMsg}`;

  const socials = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl" />,
      url: waUrl,
      bg: "bg-[#25D366] hover:bg-[#20ba5a]",
      label: "Escríbenos al 312 593 8264",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl" />,
      url: "https://instagram.com",
      bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90",
      label: "@guarderiacanina",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-xl" />,
      url: "https://tiktok.com",
      bg: "bg-black hover:bg-neutral-800",
      label: "TikTok perruno",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-xl" />,
      url: "https://facebook.com",
      bg: "bg-[#1877F2] hover:bg-[#166fe5]",
      label: "Comunidad Facebook",
    },
    {
      name: "Llamada Directa",
      icon: <FaPhoneAlt className="text-lg" />,
      url: `tel:${phone}`,
      bg: "bg-primary hover:bg-primary-dark",
      label: "Llamar: 312 593 8264",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 select-none">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 mb-2 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-xs font-bold text-primary uppercase tracking-wider">
            <IoPaw className="text-secondary animate-bounce text-sm" />
            <span>¡Conéctate con nosotros!</span>
          </div>

          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-all duration-200 group text-neutral-700 hover:text-primary"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-110 ${social.bg}`}>
                {social.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-neutral-800">{social.name}</span>
                <span className="text-[11px] text-neutral-500">{social.label}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Main trigger button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir canales de contacto y redes sociales"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/80"
        >
          {isOpen ? (
            <IoClose className="text-2xl" />
          ) : (
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <IoPaw className="text-lg text-white" />
              <span>¡Atención Inmediata!</span>
            </div>
          )}
        </button>

        {!isOpen && (
          <span className="hidden md:inline-block absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            WhatsApp, Instagram, TikTok & Facebook 🐾
          </span>
        )}
      </div>
    </div>
  );
}
