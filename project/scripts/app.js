/* WDD131 Project JS
   Requirements covered:
   - multiple functions
   - DOM interaction (select, modify, events)
   - conditional branching
   - objects, arrays, array methods
   - template literals only for output strings
   - localStorage
*/

const STORAGE_KEYS = {
  favorites: "spct_favorites",
  reminder: "spct_reminder",
  username: "spct_username"
};

const guides = [
  { id: "g1", topic: "html", title: "Semantic Starter", minutes: 15, level: "beginner", img: "images/card-1.svg", challenge: "Build a header/nav using semantic tags." },
  { id: "g2", topic: "css", title: "Grid in 20", minutes: 20, level: "beginner", img: "images/card-2.svg", challenge: "Create a responsive 2-column layout using CSS Grid." },
  { id: "g3", topic: "js", title: "DOM Mini", minutes: 15, level: "beginner", img: "images/card-3.svg", challenge: "Select an element, change text, and react to a click event." },
  { id: "g4", topic: "js", title: "LocalStorage Habit", minutes: 20, level: "beginner", img: "images/card-3.svg", challenge: "Save and load a user preference using localStorage." },
  { id: "css5", topic: "css", title: "Contrast Check", minutes: 10, level: "beginner", img: "images/card-2.svg", challenge: "Adjust colors to improve readability and contrast." }
];

const events = [
  { date: "Saturday", time: "10:00", topic: "html", title: "HTML Quick Build", detail: "Practice semantic layout + accessible nav." },
  { date: "Wednesday", time: "19:30", topic: "css", title: "CSS Grid Clinic", detail: "Make a layout that adapts without breaking." },
  { date: "Friday", time: "20:00", topic: "js", title: "JS DOM Lab", detail: "Events + template literals + simple state." }
];

function $(selector) {
  return document.querySelector(selector);
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = `${new Date().getFullYear()}`;
}

function setupMobileNav() {
  const btn = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function topicLabel(topic) {
  const map = { html: "HTML", css: "CSS", js: "JavaScript" };
  return map[topic] ?? "General";
}

function cardTemplate(item, actionLabel) {
  return `
    <article class="card">
      <img src="${item.img}" alt="${item.title} illustration" width="800" height="500" loading="lazy" />
      <h3>${item.title}</h3>
      <p class="muted"><strong>${topicLabel(item.topic)}</strong> • ${item.minutes} min • ${item.level}</p>
      <p>${item.challenge}</p>
      <button class="btn btn-ghost" type="button" data-save="${item.id}">${actionLabel}</button>
    </article>
  `;
}

function getFavorites() {
  return loadJSON(STORAGE_KEYS.favorites, []);
}

function isFavorite(id) {
  const favs = getFavorites();
  return favs.includes(id);
}

function toggleFavorite(id) {
  const favs = getFavorites();
  const exists = favs.includes(id);

  let updated = [];
  if (exists) {
    updated = favs.filter(x => x !== id);
  } else {
    updated = [...favs, id];
  }

  saveJSON(STORAGE_KEYS.favorites, updated);
  return updated;
}

function renderFavoritesSummary() {
  const listEl = $("#favorites-list");
  const countEl = $("#favorites-count");
  if (!listEl || !countEl) return;

  const favs = getFavorites();
  countEl.textContent = `${favs.length} saved favorite(s).`;

  if (favs.length === 0) {
    listEl.innerHTML = `<p class="muted">Save a guide challenge and it will appear here.</p>`;
    return;
  }

  const items = guides.filter(g => favs.includes(g.id));
  const html = items.map(g => `
    <div class="card" style="margin-top:10px;">
      <p><strong>${g.title}</strong> <span class="muted">(${topicLabel(g.topic)})</span></p>
      <button class="btn btn-ghost" type="button" data-save="${g.id}">Remove</button>
    </div>
  `).join("");

  listEl.innerHTML = html;
}

function wireSaveButtons(container) {
  if (!container) return;

  container.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-save]");
    if (!btn) return;

    const id = btn.getAttribute("data-save");
    const updated = toggleFavorite(id);

    const label = updated.includes(id) ? "Saved ✓" : "Save Favorite";
    if (btn.tagName.toLowerCase() === "button") btn.textContent = `${label}`;

    renderFavoritesSummary();
  });
}

function renderFeatured() {
  const grid = $("#featured-grid");
  if (!grid) return;

  const featured = guides.slice(0, 3);
  grid.innerHTML = featured.map(g => cardTemplate(g, isFavorite(g.id) ? "Saved ✓" : "Save Favorite")).join("");
  wireSaveButtons(grid);
}

function renderGuidesPage() {
  const grid = $("#guides-grid");
  if (!grid) return;

  const topicSel = $("#topic-filter");
  const maxMin = $("#max-minutes");
  const resetBtn = $("#reset-filters");

  const apply = () => {
    const topic = topicSel ? topicSel.value : "all";
    const max = maxMin ? Number(maxMin.value) : 20;

    const filtered = guides
      .filter(g => (topic === "all" ? true : g.topic === topic))
      .filter(g => (Number.isFinite(max) ? g.minutes <= max : true));

    grid.innerHTML = filtered
      .map(g => cardTemplate(g, isFavorite(g.id) ? "Saved ✓" : "Save Favorite"))
      .join("");

    wireSaveButtons(grid);
  };

  if (topicSel) topicSel.addEventListener("change", apply);
  if (maxMin) maxMin.addEventListener("input", apply);

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (topicSel) topicSel.value = "all";
      if (maxMin) maxMin.value = "20";
      apply();
    });
  }

  apply();
}

function renderEvents() {
  const list = $("#events-list");
  const nextLine = $("#next-event-line");
  if (!list && !nextLine) return;

  const sorted = [...events]; // simple, but shows array usage
  if (nextLine) {
    const first = sorted[0];
    nextLine.textContent = `${first.date} at ${first.time} • ${topicLabel(first.topic)} • ${first.title}`;
  }

  if (list) {
    list.innerHTML = sorted.map(ev => `
      <div class="card" style="margin-bottom:10px;">
        <p><strong>${ev.title}</strong></p>
        <p class="muted">${ev.date} • ${ev.time} • ${topicLabel(ev.topic)}</p>
        <p>${ev.detail}</p>
      </div>
    `).join("");
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderSavedReminder() {
  const box = $("#saved-reminder");
  if (!box) return;

  const data = loadJSON(STORAGE_KEYS.reminder, null);
  if (!data) {
    box.textContent = "No reminder saved yet.";
    return;
  }

  box.innerHTML = `
    <p><strong>${data.fullname}</strong> <span class="muted">(${data.email})</span></p>
    <p class="muted">Topic: ${topicLabel(data.topic)}</p>
    <p>${data.message ? data.message : "No message provided."}</p>
  `;
}

function setupReminderForm() {
  const form = $("#reminder-form");
  if (!form) return;

  const status = $("#form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = $("#fullname")?.value.trim() ?? "";
    const email = $("#email")?.value.trim() ?? "";
    const topic = $("#topic")?.value ?? "";
    const message = $("#message")?.value.trim() ?? "";

    let msg = "";
    if (!fullname || fullname.length < 2) {
      msg = "Please enter your full name.";
    } else if (!validateEmail(email)) {
      msg = "Please enter a valid email address.";
    } else if (!topic) {
      msg = "Please choose a topic.";
    } else {
      msg = "Reminder saved locally ✓";
      saveJSON(STORAGE_KEYS.reminder, { fullname, email, topic, message });
      form.reset();
    }

    if (status) status.textContent = `${msg}`;
    renderSavedReminder();
  });

  renderSavedReminder();
}

function welcomeLine() {
  const el = $("#welcome-line");
  if (!el) return;

  const stored = localStorage.getItem(STORAGE_KEYS.username);
  const hour = new Date().getHours();

  let greeting = "Welcome";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  if (stored) {
    el.textContent = `${greeting}, ${stored}! Want to update your name? Click here.`;
  } else {
    el.textContent = `${greeting}! Click here to save your name for next time.`;
  }

  el.style.cursor = "pointer";
  el.addEventListener("click", () => {
    const name = prompt("Enter your name (saved locally):");
    if (name && name.trim().length >= 2) {
      localStorage.setItem(STORAGE_KEYS.username, name.trim());
      el.textContent = `${greeting}, ${name.trim()}! Your name is saved locally.`;
    } else {
      el.textContent = `${greeting}! (Name not saved.)`;
    }
  });
}

/* Init */
setYear();
setupMobileNav();
renderFeatured();
renderFavoritesSummary();
renderGuidesPage();
renderEvents();
setupReminderForm();
welcomeLine();
