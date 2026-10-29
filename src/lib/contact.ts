/** Single source for every contact channel the site links to. */
export const PHONE = "3125938264";
export const PHONE_DISPLAY = "312 593 8264";
export const TEL_HREF = `tel:+52${PHONE}`;

export const ADDRESS = "Av. Niños Héroes 1275, La Oriental, Colima, México, 28046";
export const MAP_URL =
  "https://www.bing.com/maps/default.aspx?v=2&where1=Av.+Ni%C3%B1os+h%C3%A9roes+1275+la+oriental%2C+Colima%2C+Mexico%2C+28046";

/** WhatsApp deep link with a prefilled message. */
export const waLink = (message = "Hola Lugo Vid, me gustaría información para mi perrito") =>
  `https://wa.me/52${PHONE}?text=${encodeURIComponent(message)}`;
