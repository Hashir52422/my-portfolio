import "./style.css";
import { createHeroScene } from "./three/heroScene.js";
import { projects, skillsFrontend, skillsBackend } from "./data.js";
import gsap from "gsap";

/* ---------------- loader ---------------- */
const loader = document.getElementById("loader");
const loaderPct = document.getElementById("loader-pct");
let pct = 0;
const loaderTimer = setInterval(() => {
  pct += Math.random() * 18;
  if (pct >= 100) {
    pct = 100;
    loaderPct.textContent = "100%";
    clearInterval(loaderTimer);
    setTimeout(() => loader.classList.add("done"), 250);
    return;
  }
  loaderPct.textContent = `${Math.floor(pct)}%`;
}, 120);

/* ---------------- dark / light mode ---------------- */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.documentElement.classList.add("light");

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  const isLight = document.documentElement.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  gsap.fromTo(themeToggle, { rotate: 0 }, { rotate: 360, duration: 0.5, ease: "power2.out" });
});

/* ---------------- hero word-reveal (compile effect) ---------------- */
const words = document.querySelectorAll(".h1-word");
words.forEach((w, i) => {
  setTimeout(() => w.classList.add("visible"), 120 + i * 110);
});
setTimeout(() => document.querySelector(".hero-sub")?.classList.add("visible"), 800);
setTimeout(() => document.querySelector(".hero-actions")?.classList.add("visible"), 1050);
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) nav.classList.add("visible");
  else nav.classList.remove("visible");
});

/* ---------------- hero three.js scene ---------------- */
const heroCanvas = document.getElementById("hero-canvas");
const heroScene = createHeroScene(heroCanvas);

window.addEventListener("pointermove", (e) => {
  const nx = (e.clientX / window.innerWidth - 0.5) * 2;
  const ny = (e.clientY / window.innerHeight - 0.5) * 2;
  heroScene.setPointer(nx, ny);
});

const heroSection = document.getElementById("hero");
window.addEventListener("scroll", () => {
  const h = heroSection.offsetHeight;
  const t = Math.min(Math.max(window.scrollY / h, 0), 1);
  heroScene.setScroll(t);
});

window.addEventListener("resize", () => heroScene.resize());

/* ================================================================
   WORK SECTION — interactive grid with filters + modal
   ================================================================ */
const grid = document.getElementById("workGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("workModal");
const modalBackdrop = modal.querySelector(".modal-backdrop");
const modalClose = modal.querySelector(".modal-close");

let activeFilter = "all";
let cards = [];

/* scroll reveal observer — declared early so buildCards can use it */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function buildCards(filter) {
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

  // animate out existing cards first
  if (cards.length) {
    gsap.to(cards, {
      opacity: 0, scale: 0.92, y: 16, duration: 0.25, stagger: 0.04,
      onComplete: renderCards
    });
  } else {
    renderCards();
  }

  function renderCards() {
    grid.innerHTML = "";
    cards = [];

    filtered.forEach((p, i) => {
      const card = document.createElement("button");
      card.className = "work-card-new reveal";
      card.setAttribute("aria-label", `View ${p.title} project details`);
      card.dataset.index = projects.indexOf(p);
      card.style.setProperty("--card-accent", p.color);
      card.innerHTML = `
        <div class="wcn-header">
          <div class="wcn-glyph" style="background:${p.color}">${p.title.charAt(0)}</div>
          <span class="wcn-year">${p.year}</span>
        </div>
        <span class="wcn-tag">${p.tag}</span>
        <h3 class="wcn-title">${p.title}</h3>
        <p class="wcn-desc">${p.desc}</p>
        <div class="wcn-stack">
          ${p.stack.slice(0, 3).map(s => `<span>${s}</span>`).join("")}
        </div>
        <div class="wcn-footer">
          ${p.link
            ? `<a class="wcn-link" href="${p.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${p.linkLabel} ↗</a>`
            : `<span class="wcn-link wcn-link--disabled">${p.linkLabel}</span>`
          }
          <span class="wcn-cta">Details →</span>
        </div>
      `;
      card.addEventListener("click", () => openModal(projects.indexOf(p)));
      card.addEventListener("mousemove", (e) => tiltCard(e, card));
      card.addEventListener("mouseleave", () => resetCard(card));
      grid.appendChild(card);
      cards.push(card);
    });

    // entrance animation
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" }
    );

    // re-attach reveal observer
    cards.forEach(c => io.observe(c));
  }
}

/* 3D tilt */
function tiltCard(e, card) {
  const rect = card.getBoundingClientRect();
  const nx = (e.clientX - rect.left) / rect.width - 0.5;
  const ny = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(card, {
    rotateY: nx * 10, rotateX: -ny * 10, translateY: -6,
    duration: 0.3, ease: "power2.out", transformPerspective: 700
  });
}
function resetCard(card) {
  gsap.to(card, { rotateY: 0, rotateX: 0, translateY: 0, duration: 0.5, ease: "elastic.out(1, 0.6)" });
}

/* filter tabs */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    activeFilter = btn.dataset.filter;
    buildCards(activeFilter);
  });
});

/* modal open */
function openModal(idx) {
  const p = projects[idx];
  document.getElementById("modalGlyph").textContent = p.title.charAt(0);
  document.getElementById("modalGlyph").style.background = p.color;
  document.getElementById("modalTag").textContent = `${p.tag} · ${p.year}`;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDetail").textContent = p.detail;

  const stackEl = document.getElementById("modalStack");
  stackEl.innerHTML = p.stack.map(s => `<span>${s}</span>`).join("");

  const linkEl = document.getElementById("modalLink");
  if (p.link) {
    linkEl.textContent = `${p.linkLabel} ↗`;
    linkEl.href = p.link;
    linkEl.target = "_blank";
    linkEl.rel = "noopener";
    linkEl.style.display = "";
  } else {
    linkEl.style.display = "none";
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  gsap.fromTo(".modal-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.3 });
  gsap.fromTo(".modal-panel",
    { opacity: 0, y: 60, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
  );
}

function closeModal() {
  gsap.to(".modal-panel", { opacity: 0, y: 40, scale: 0.96, duration: 0.25, ease: "power2.in" });
  gsap.to(".modal-backdrop", {
    opacity: 0, duration: 0.25,
    onComplete: () => { modal.hidden = true; document.body.style.overflow = ""; }
  });
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

/* init */
buildCards("all");

/* ---------------- render skills lists ---------------- */
const feList = document.getElementById("skillsFrontend");
skillsFrontend.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="sk-num">${String(i + 1).padStart(2, "0")}</span>${s}`;
  feList.appendChild(li);
});
const beList = document.getElementById("skillsBackend");
skillsBackend.forEach((s, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="sk-num">${String(i + 1).padStart(2, "0")}</span>${s}`;
  beList.appendChild(li);
});

/* ---------------- scroll reveal (for non-work elements) ---------------- */
const revealEls = document.querySelectorAll(
  ".timeline-item, .skills-col li, .number-item, .about-text p"
);
revealEls.forEach((el) => { el.classList.add("reveal"); io.observe(el); });

/* ---------------- animated stat counters ---------------- */
const statEls = document.querySelectorAll(".stat-num");
const statIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.round(target / 30));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur;
      }, 30);
      statIO.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
statEls.forEach((el) => statIO.observe(el));

/* ---------------- contact form ---------------- */
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const text = `Hi, I found you through your portfolio.\n\n*Name:* ${data.get("name")}\n*Email:* ${data.get("email")}\n*Message:* ${data.get("message")}`;
  const phone = "923105944049";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  formNote.textContent = "Opening WhatsApp…";
  form.reset();
});