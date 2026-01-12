// Atualiza o ano atual no footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Mostra a data da última modificação do documento
document.getElementById("lastModified").innerHTML =
  "Last Modified: " + document.lastModified;
