import React, { useState } from "react";
import { FaWhatsapp, FaPaw, FaPaperPlane } from "react-icons/fa";

export default function QuickContactForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    dogName: "",
    service: "guarderia",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `¡Hola Lugo Vid! 🐾\nMi nombre es: ${formData.ownerName || "Cliente"}\nPerrito: ${formData.dogName || "Mi mascota"}\nServicio de interés: ${formData.service}\nMensaje: ${formData.message || "Quiero más informes"}`
    );
    window.open(`https://wa.me/523125938264?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-line shadow-xl">
      <div className="flex items-center gap-2 mb-2">
        <FaPaw className="text-secondary text-lg animate-paw" />
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">
          Atención Inmediata por WhatsApp
        </span>
      </div>

      <h3 className="text-2xl font-bold text-ink">
        Envíanos un mensaje rápido
      </h3>
      <p className="text-sm text-muted mt-1 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
      </p>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in fade-in">
          <span className="text-4xl block mb-2">🎉🐾</span>
          <h4 className="text-lg font-bold text-emerald-800">¡Mensaje redirigido a WhatsApp!</h4>
          <p className="text-xs text-emerald-600 mt-1">
            Si no se abrió automáticamente, puedes escribirnos directamente al 312 593 8264.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold cursor-pointer hover:bg-emerald-700"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                Tu Nombre
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Carlos Martínez"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
                Nombre de tu Perrito
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Bruno"
                value={formData.dogName}
                onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
              Servicio de Interés
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="Guardería Canina (Día)">Guardería Canina (Día)</option>
              <option value="Pensión Canina (Estadía/Noche)">Pensión Canina (Estadía/Noche)</option>
              <option value="Paseos & Ejercicio">Paseos & Ejercicio</option>
              <option value="Baños & Spa Canino">Baños & Spa Canino</option>
              <option value="Transporte Canino">Transporte Canino</option>
              <option value="Mucha Diversión (Full)">Mucha Diversión (Full)</option>
              <option value="Eventos & Summer Fest">Eventos & Summer Fest</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5 uppercase tracking-wider">
              Mensaje o Dudas
            </label>
            <textarea
              rows={3}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm md:text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Enviar directamente a WhatsApp (312 593 8264)</span>
          </button>
        </form>
      )}
    </div>
  );
}
