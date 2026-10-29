/**
 * Boots every `[data-slider]` on the page with Swiper, and tears them down
 * before Astro swaps the page so view transitions never leak instances.
 *
 *   data-slider="hero"   full-bleed fade with autoplay progress
 *   data-slider="cards"  free-width card rail with prev/next buttons
 *
 * Mounting is idempotent, so it is safe to run on first load and again on
 * every `astro:page-load`.
 */
import Swiper from "swiper";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";

// Swiper's CSS is imported from each component's frontmatter, not here: CSS
// pulled in by a client script is injected once and lost on the next
// ClientRouter head swap, which collapsed the rails to a vertical stack.

const instances = new Set<Swiper>();
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const a11y = {
  prevSlideMessage: "Anterior",
  nextSlideMessage: "Siguiente",
  firstSlideMessage: "Primera diapositiva",
  lastSlideMessage: "Última diapositiva",
  paginationBulletMessage: "Ir a la diapositiva {{index}}",
  slideLabelMessage: "{{index}} de {{slidesLength}}",
};

function mountHero(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>(".swiper");
  if (!el) return;
  const still = reducedMotion();
  const delay = Number(root.dataset.delay ?? 6500);
  const count = el.querySelectorAll(".swiper-slide").length;

  const swiper = new Swiper(el, {
    modules: [A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination],
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: still ? 0 : 900,
    rewind: true,
    allowTouchMove: count > 1,
    keyboard: { enabled: true, onlyInViewport: true },
    autoplay:
      count > 1 && !still
        ? { delay, disableOnInteraction: false, pauseOnMouseEnter: true }
        : false,
    navigation: {
      prevEl: root.querySelector<HTMLElement>("[data-prev]"),
      nextEl: root.querySelector<HTMLElement>("[data-next]"),
    },
    pagination: {
      el: root.querySelector<HTMLElement>("[data-pagination]"),
      clickable: true,
      bulletClass: "hero-bullet",
      bulletActiveClass: "is-active",
      renderBullet: (i, cls) =>
        `<button type="button" class="${cls}" aria-label="Ir a la diapositiva ${i + 1}"><span></span></button>`,
    },
    a11y,
    on: {
      // Drives the fill of the active bar so the countdown is visible.
      autoplayTimeLeft(_s, _time, progress) {
        root.style.setProperty("--hero-progress", String(1 - progress));
      },
      // Without autoplay (reduced motion, single slide) the active bar stays full.
      slideChange(s) {
        root.style.setProperty("--hero-progress", s.autoplay?.running ? "0" : "1");
      },
    },
  });
  instances.add(swiper);
}

function mountCards(root: HTMLElement) {
  const el = root.querySelector<HTMLElement>(".swiper");
  if (!el) return;

  const swiper = new Swiper(el, {
    modules: [A11y, Keyboard, Navigation],
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: reducedMotion() ? 0 : 550,
    grabCursor: true,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: {
      prevEl: root.querySelector<HTMLElement>("[data-prev]"),
      nextEl: root.querySelector<HTMLElement>("[data-next]"),
      disabledClass: "is-disabled",
      lockClass: "is-locked",
    },
    breakpoints: { 768: { spaceBetween: 20 } },
    a11y,
  });
  instances.add(swiper);
}

const MOUNTERS: Record<string, (root: HTMLElement) => void> = {
  hero: mountHero,
  cards: mountCards,
};

function mountAll() {
  // Drop instances whose DOM was swapped out by a navigation.
  instances.forEach((s) => {
    if (!s.el?.isConnected) {
      s.destroy(true, true);
      instances.delete(s);
    }
  });

  document.querySelectorAll<HTMLElement>("[data-slider]").forEach((root) => {
    const el = root.querySelector<HTMLElement & { swiper?: Swiper }>(".swiper");
    if (!el || (el.swiper && !el.swiper.destroyed)) return;
    MOUNTERS[root.dataset.slider ?? "cards"]?.(root);
  });
}

function destroyAll() {
  instances.forEach((s) => s.destroy(true, true));
  instances.clear();
}

mountAll();
document.addEventListener("astro:page-load", mountAll);
document.addEventListener("astro:before-swap", destroyAll);
