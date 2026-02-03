document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Last modified (real)
  const lastModifiedSpan = document.getElementById('last-modified');
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();
  }

  // Hamburger menu
  const hamburgerButton = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  function toggleMenu() {
    if (!menu || !hamburgerButton) return;

    menu.classList.toggle('show');
    const isOpen = menu.classList.contains('show');

    hamburgerButton.textContent = isOpen ? 'X' : '☰';
    hamburgerButton.setAttribute('aria-expanded', String(isOpen));
  }

  if (hamburgerButton) hamburgerButton.addEventListener('click', toggleMenu);

  // Data + rendering
  const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
      templeName: "Adelaide Australia",
      location: "Adelaide, Australia",
      dedicated: "2000, June, 15",
      area: 10700,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/adelaide-australia/1280x800/adelaide-australia-temple-lds-856093-wallpaper.jpg"
    },
    {
      templeName: "Apia Samoa",
      location: "Apia,Samoa",
      dedicated: "2005, September, 4",
      area: 18691,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/apia-samoa/1280x800/apia-samoa-temple-lds-460475-wallpaper.jpg"
    },
    {
      templeName: "Asunción Paraguay",
      location: "Asunción, Paraguay",
      dedicated: "2019, November, 3",
      area: 11906,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/asuncion-paraguay/1280x800/4-e49cfde212b104b97a0463371127c11e47f9c084.jpeg"
    },
    {
      templeName: "Barranquilla Colombia",
      location: "Barranquilla Colombia",
      dedicated: "2018, December, 9",
      area: 25349,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/1280x800/2-Barranquilla-Columblia-Temple-2135201.jpg"
    },
    {
      templeName: "Campinas Brazil",
      location: "Campinas, São Paulo, Brazil",
      dedicated: "2002, May, 17",
      area: 49100,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/campinas-brazil/1280x800/mormon-temple-campinas-brazil-1029890-wallpaper.jpg"
    }
  ];

  const gallery = document.querySelector('.gallery');

  function createCard(temple) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = `
      <img
        src="${temple.imageUrl}"
        alt="${temple.templeName}"
        loading="lazy"
        decoding="async"
        referrerpolicy="strict-origin-when-cross-origin"
      >
    `;

    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Size:</strong> ${temple.area} sq ft</p>
      ${img}
    `;

    return card;
  }

  function displayTemples(list) {
    if (!gallery) return;
    gallery.innerHTML = '';
    list.forEach(t => gallery.appendChild(createCard(t)));
  }

  function filterTemples(criteria) {
    let filtered;

    switch (criteria) {
      case 'old':
        filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
        break;
      case 'new':
        filtered = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
        break;
      case 'large':
        filtered = temples.filter(t => t.area > 90000);
        break;
      case 'small':
        filtered = temples.filter(t => t.area < 10000);
        break;
      default:
        filtered = temples;
        break;
    }

    displayTemples(filtered);
  }

  function updateTitle(criteria) {
    let title;
    switch (criteria) {
      case 'old': title = "Old"; break;
      case 'new': title = "New"; break;
      case 'large': title = "Large"; break;
      case 'small': title = "Small"; break;
      default: title = "Home"; break;
    }
    document.querySelector('main h2').textContent = title;
    document.title = `${title} - Temple Album`;
  }

  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const criteria = link.getAttribute('data-filter');
      filterTemples(criteria);
      updateTitle(criteria);
    });
  });

  displayTemples(temples);
  updateTitle('all');
});
