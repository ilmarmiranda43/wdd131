const temp = parseFloat(document.getElementById("temp").textContent);
const wind = parseFloat(document.getElementById("wind").textContent);
const chill = document.getElementById("chill");

function calculateWindChill(t, v) {
  return (
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16)
  ).toFixed(1);
}

if (temp <= 10 && wind > 4.8) {
  chill.textContent = `${calculateWindChill(temp, wind)} °C`;
} else {
  chill.textContent = "N/A";
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;
