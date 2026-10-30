export interface ServicePrice {
  category: "baños" | "pension" | "guarderia";
  size: "Extra CH" | "Chico" | "Mediano" | "Grande" | "Extra Grande";
  weightRange: string;
  hairLength?: "corto" | "largo";
  price: number;
}

export const lugovidPricing: ServicePrice[] = [
  // --- BAÑOS ---
  {
    category: "baños",
    size: "Extra CH",
    weightRange: "Menos de 5 kg",
    hairLength: "corto",
    price: 135,
  },
  {
    category: "baños",
    size: "Extra CH",
    weightRange: "Menos de 5 kg",
    hairLength: "largo",
    price: 190,
  },
  {
    category: "baños",
    size: "Chico",
    weightRange: "5 a 10 kg",
    hairLength: "corto",
    price: 168,
  },
  {
    category: "baños",
    size: "Chico",
    weightRange: "5 a 10 kg",
    hairLength: "largo",
    price: 225,
  },
  {
    category: "baños",
    size: "Mediano",
    weightRange: "10 a 20 kg",
    hairLength: "corto",
    price: 225,
  },
  {
    category: "baños",
    size: "Mediano",
    weightRange: "10 a 20 kg",
    hairLength: "largo",
    price: 280,
  },
  {
    category: "baños",
    size: "Grande",
    weightRange: "20 a 30 kg",
    hairLength: "corto",
    price: 280,
  },
  {
    category: "baños",
    size: "Grande",
    weightRange: "20 a 30 kg",
    hairLength: "largo",
    price: 340,
  },
  {
    category: "baños",
    size: "Extra Grande",
    weightRange: "Más de 30 kg",
    hairLength: "corto",
    price: 350,
  },
  {
    category: "baños",
    size: "Extra Grande",
    weightRange: "Más de 30 kg",
    hairLength: "largo",
    price: 400,
  },

  // --- PENSIÓN ---
  {
    category: "pension",
    size: "Extra CH",
    weightRange: "Menos de 5 kg",
    price: 250,
  },
  {
    category: "pension",
    size: "Chico",
    weightRange: "5 a 10 kg",
    price: 270,
  },
  {
    category: "pension",
    size: "Mediano",
    weightRange: "10 a 20 kg",
    price: 300,
  },
  {
    category: "pension",
    size: "Grande",
    weightRange: "20 a 30 kg",
    price: 330,
  },
  {
    category: "pension",
    size: "Extra Grande",
    weightRange: "Más de 30 kg",
    price: 380,
  },

  // --- GUARDERÍA ---
  {
    category: "guarderia",
    size: "Extra CH",
    weightRange: "Menos de 5 kg",
    price: 180,
  },
  {
    category: "guarderia",
    size: "Chico",
    weightRange: "5 a 10 kg",
    price: 200,
  },
  {
    category: "guarderia",
    size: "Mediano",
    weightRange: "10 a 20 kg",
    price: 230,
  },
  {
    category: "guarderia",
    size: "Grande",
    weightRange: "20 a 30 kg",
    price: 270,
  },
  {
    category: "guarderia",
    size: "Extra Grande",
    weightRange: "Más de 30 kg",
    price: 300,
  },
];
