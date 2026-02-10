// W06 requirements covered here:
// - More than one function
// - DOM interaction: select, modify, listen + react to events
// - Conditional branching
// - Objects, arrays, array methods
// - Template literals
// - localStorage

const KEY = "brazil_trip_favorites_v1";

const places = [
  { id: "rio", name: "Rio de Janeiro", region: "Southeast", vibe: "City", cost: "mid", days: 3, highlight: "Praias, trilhas e cultura", img: "images/rio.webp", alt: "Vista do Rio de Janeiro com montanhas e mar" },
  { id: "amazon", name: "Amazônia", region: "North", vibe: "Nature", cost: "mid", days: 4, highlight: "Floresta e rios gigantes", img: "images/amazonia.webp", alt: "Amazon forest" },
  { id: "salvador", name: "Salvador", region: "Northeast", vibe: "Culture", cost: "low", days: 2, highlight: "História, música e culinária", img: "images/salvador.webp", alt: "Centro histórico de Salvador com arquitetura colorida" },
  { id: "foz", name: "Foz do Iguaçu", region: "South", vibe: "Nature", cost: "mid", days: 2, highlight: "Cataratas impressionantes", img: "images/foz.webp", alt: "Cataratas com grande volume de água" },
  { id: "pantanal", name: "Pantanal", region: "Center-West", vibe: "Wildlife", cost: "high", days: 4, highlight: "Vida selvagem e safáris fotográficos", img: "images/pantanal.webp", alt: "Paisagem alagada do Pantanal com vegetação" }
];

function $(sel) { return document.querySelector(sel); }

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem(KEY, JSON.stringify(favs));
}

function formatBudgetMessage(budget) {
  // conditional branching example
  if (budget === "low") return "Orçamento econômico: foco em passeios gratuitos e comida local.";
  if (budget === "mid") return "Orçamento médio: bom equilíbrio entre passeios pagos e gratuitos.";
  return "Orçamento alto: mais conforto, tours e experiências guiadas.";
}

function renderDestinations(list) {
  const target = $("#destinationsList");
  if (!target) return;

  const favs = loadFavorites();
  target.innerHTML = list.map(p => {
    const isFav = favs.includes(p.id);
    return `
      <article class="card place">
        <img src="${p.img}" alt="${p.alt}" loading="lazy" width="640" height="360">
        <h3>${p.name}</h3>
        <p class="meta">${p.region} • ${p.vibe} • ${p.days} days</p>
        <p class="meta">${p.highlight}</p>
        <button class="btn ${isFav ? "primary" : ""}" data-fav="${p.id}" type="button">
          ${isFav ? "★ Favorito" : "☆ Add Favorite"}
        </button>
      </article>
    `;
  }).join("");
}

function applyFilters() {
  const region = $("#filterRegion")?.value ?? "all";
  const vibe = $("#filterVibe")?.value ?? "all";

  const filtered = places
    .filter(p => region === "all" ? true : p.region === region)
    .filter(p => vibe === "all" ? true : p.vibe === vibe);

  renderDestinations(filtered);
}

function toggleFavorite(id) {
  const favs = loadFavorites();
  const next = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
  saveFavorites(next);
  applyFilters(); // re-render to update button state
}

function renderPlan() {
  const out = $("#planOutput");
  if (!out) return;

  const days = Number($("#days")?.value ?? 5);
  const budget = $("#budget")?.value ?? "mid";
  const vibe = $("#vibe")?.value ?? "Nature";

  // conditional + array methods
  const candidates = places
    .filter(p => p.vibe === vibe)
    .sort((a, b) => a.days - b.days);

  const chosen = [];
  let remaining = days;

  for (const p of candidates) {
    if (remaining <= 0) break;

    // budget rule example
    const okByBudget =
      (budget === "low" && p.cost !== "high") ||
      (budget === "mid") ||
      (budget === "high");

    if (!okByBudget) continue;

    chosen.push(p);
    remaining -= p.days;
  }

  const totalChosenDays = chosen.reduce((sum, p) => sum + p.days, 0);

  out.innerHTML = `
    <div class="notice">
      <strong>Suggested plan</strong><br>
      ${formatBudgetMessage(budget)}<br>
      You asked for <strong>${days}</strong> days and <strong>${vibe}</strong>.
      This plan uses <strong>${totalChosenDays}</strong> day(s).
    </div>
    <div class="list" style="margin-top:.9rem">
      ${chosen.length ? chosen.map(p => `
        <div class="item">
          <div class="info">
            <strong>${p.name}</strong>
            <span class="small">${p.region} • ${p.vibe} • ${p.days} days</span>
          </div>
          <span class="pill">cost: ${p.cost}</span>
        </div>
      `).join("") : `<div class="notice error"><strong>No results</strong><br>Try changing vibe/budget/days.</div>`}
    </div>
  `;
}

function wireUp() {
  // Destinations page filters
  $("#filterRegion")?.addEventListener("change", applyFilters);
  $("#filterVibe")?.addEventListener("change", applyFilters);

  // Favorite buttons (event delegation)
  $("#destinationsList")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    toggleFavorite(btn.dataset.fav);
  });

  // Planner
  $("#planForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPlan();
  });

  // Simple form validation + feedback
  $("#contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const msg = $("#message").value.trim();
    const feedback = $("#formFeedback");

    if (!name || !email || msg.length < 10) {
      feedback.innerHTML = `<div class="notice error"><strong>Check your form</strong><br>Please fill name/email and write at least 10 characters.</div>`;
      return;
    }

    feedback.innerHTML = `<div class="notice"><strong>Thanks, ${name}!</strong><br>Your message was received (demo). ✅</div>`;
    $("#contactForm").reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Only run what exists on the page
  renderDestinations(places);
  applyFilters();
  wireUp();
});
