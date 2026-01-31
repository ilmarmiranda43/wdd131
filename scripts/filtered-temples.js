// Temple data (includes the sample + at least 3 more) — required by the assignment.
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria-temple-5087-main.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "images/payson-utah-temple-62834-main.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "images/yigo-guam-temple-26495-main.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "images/washington-d.c.-temple-14992-main.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "images/lima-peru-temple-12721-main.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "images/mexico-city-mexico-temple-4060-main.jpg"
  },

  // ✅ Added at least three more:
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "images/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "images/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
      "images/017-São-Paulo-Brazil-Temple.jpg"
  }
];

const cardsContainer = document.querySelector("#templeCards");
const navLinks = document.querySelectorAll(".nav a");

// Helpers
function getDedicatedYear(dedicatedStr) {
  // format: "YYYY, Month, Day"
  const yearPart = dedicatedStr.split(",")[0].trim();
  const year = Number(yearPart);
  return Number.isFinite(year) ? year : 0;
}

function clearCards() {
  cardsContainer.innerHTML = "";
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.classList.add("card");

  const header = document.createElement("header");
  const h3 = document.createElement("h3");
  h3.textContent = temple.templeName;
  header.appendChild(h3);

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} temple`;
  img.loading = "lazy"; // ✅ native lazy loading (required)
  img.width = 400;
  img.height = 250;

  const meta = document.createElement("div");
  meta.classList.add("meta");
  meta.innerHTML = `
    <span><strong>Location:</strong> ${temple.location}</span>
    <span><strong>Dedicated:</strong> ${temple.dedicated}</span>
    <span><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</span>
  `;

  card.appendChild(header);
  card.appendChild(meta);
  card.appendChild(img);

  return card;
}

function displayTemples(list) {
  clearCards();
  list.forEach((t) => {
    cardsContainer.appendChild(createTempleCard(t));
  });
}

function setActive(linkEl) {
  navLinks.forEach((a) => a.classList.remove("active"));
  linkEl.classList.add("active");
}

// Filters required by assignment
function filterTemples(filterName) {
  switch (filterName) {
    case "old":
      // built before 1900 (use dedicated year as the requirement intends)
      return temples.filter((t) => getDedicatedYear(t.dedicated) < 1900);
    case "new":
      // built after 2000
      return temples.filter((t) => getDedicatedYear(t.dedicated) > 2000);
    case "large":
      // larger than 90,000 sq ft
      return temples.filter((t) => t.area > 90000);
    case "small":
      // smaller than 10,000 sq ft
      return temples.filter((t) => t.area < 10000);
    case "home":
    default:
      return temples;
  }
}

// Footer required by assignment
function setFooterDates() {
  const yearSpan = document.querySelector("#currentyear");
  const modifiedSpan = document.querySelector("#lastModified");

  yearSpan.textContent = new Date().getFullYear();
  modifiedSpan.textContent = document.lastModified;
}

// Events
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;
    setActive(link);
    displayTemples(filterTemples(filter));
  });
});

// Init
setFooterDates();
displayTemples(temples);
