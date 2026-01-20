const input = document.querySelector("#favchap");
const list = document.querySelector("#list");

const buttons = document.querySelectorAll("main button");
const addChapterButton = buttons[0];
const addVerseButton = buttons[1];

let lastChapterLi = null; // guarda o último capítulo criado

function createDeleteButton(li) {
  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "❌";
  del.addEventListener("click", () => li.remove());
  return del;
}

// Valida formato: "Alma 5:12" (livro pode ter espaços, ex: "1 Nephi 3:7")
function parseVerse(text) {
  const value = text.trim();
  // livro + espaço + capitulo:verso
  const match = value.match(/^(.+?)\s+(\d+):(\d+)$/);

  if (!match) return null;

  const book = match[1].trim();
  const chapter = Number(match[2]);
  const verse = Number(match[3]);

  if (!book || !Number.isInteger(chapter) || !Number.isInteger(verse)) return null;

  return { book, chapter, verse, raw: `${book} ${chapter}:${verse}` };
}

// ADD CHAPTER
addChapterButton.addEventListener("click", () => {
  const value = input.value.trim();
  if (value === "") {
    alert("Please enter a chapter (example: Alma 5).");
    input.focus();
    return;
  }

  // cria o LI do capítulo
  const li = document.createElement("li");

  // título do capítulo
  const title = document.createElement("span");
  title.textContent = `Chapter: ${value} `;

  // lista interna de versos
  const versesUl = document.createElement("ul");
  versesUl.className = "verses"; // opcional p/ CSS

  li.append(title);
  li.append(createDeleteButton(li));
  li.append(versesUl);

  list.append(li);

  lastChapterLi = li;

  input.value = "";
  input.focus();
});

// ADD VERSE
addVerseButton.addEventListener("click", () => {
  const typed = prompt("Enter a verse like: Alma 5:12");
  if (typed === null) return; // cancelou

  const parsed = parseVerse(typed);
  if (!parsed) {
    alert("Invalid format. Use: Alma 5:12 (Book Chapter:Verse)");
    return;
  }

  // Se tiver capítulo criado, adiciona como subitem no último capítulo
  if (lastChapterLi) {
    const versesUl = lastChapterLi.querySelector("ul");
    const verseLi = document.createElement("li");

    verseLi.textContent = parsed.raw + " ";
    verseLi.append(createDeleteButton(verseLi));

    versesUl.append(verseLi);
    return;
  }

  // Se não tiver capítulo, adiciona na lista principal com label
  const li = document.createElement("li");
  li.textContent = `Verse: ${parsed.raw} `;
  li.append(createDeleteButton(li));
  list.append(li);
});
