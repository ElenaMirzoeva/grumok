(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // year
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());

  // smooth anchors (respect reduced motion)
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (!prefersReduced) {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  // reveal on scroll
  const targets = $$(".reveal");
  if (targets.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        },
        { root: null, threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      targets.forEach((el) => io.observe(el));
    }
  }

  // telegram placeholder hint (non-blocking)
  const tg = $("#tgLink");
  const tgHref = tg?.getAttribute("href") || "";
  const isPlaceholder = tgHref.includes("FOUNDERS_TELEGRAM");
  if (isPlaceholder) {
    const sticky = $(".stickyCta a.btn");
    [tg, sticky].filter(Boolean).forEach((a) => {
      a.setAttribute("aria-label", "нужна настройка ссылки на телеграм");
      a.classList.add("needs-config");
    });
  }
})();
