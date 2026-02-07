function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  // Multiple checkbox values can exist with the same name
  const features = params.getAll("usefulFeatures");

  return {
    productId: params.get("productName") || "",
    overallRating: params.get("overallRating") || "",
    installDate: params.get("installDate") || "",
    usefulFeatures: features,
    writtenReview: params.get("writtenReview") || "",
    userName: params.get("userName") || ""
  };
}

function productNameFromId(productId) {
  // Must match the same list used in form.js (keep it here too so review works standalone)
  const products = [
    { id: "fc-1888", name: "flux capacitor" },
    { id: "fc-2050", name: "power laces" },
    { id: "fs-1987", name: "time circuits" },
    { id: "ac-2000", name: "low voltage reactor" },
    { id: "jj-1969", name: "warp equalizer" }
  ];

  const found = products.find(p => p.id === productId);
  return found ? found.name : productId;
}

function incrementReviewCount() {
  const key = "reviewCount";
  const current = Number(localStorage.getItem(key) || "0");
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return next;
}

function renderSummary(data) {
  const dl = document.getElementById("reviewSummary");
  if (!dl) return;

  const items = [
    ["Product", productNameFromId(data.productId)],
    ["Overall Rating", data.overallRating ? `${data.overallRating}/5` : ""],
    ["Install Date", data.installDate],
    ["Useful Features", data.usefulFeatures.length ? data.usefulFeatures.join(", ") : "None selected"],
    ["Written Review", data.writtenReview ? data.writtenReview : "—"],
    ["User Name", data.userName ? data.userName : "—"]
  ];

  dl.innerHTML = "";
  items.forEach(([term, desc]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;

    const dd = document.createElement("dd");
    dd.textContent = desc;

    dl.appendChild(dt);
    dl.appendChild(dd);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Requirement: Each time review.html loads successfully after submission, increment counter
  const count = incrementReviewCount();
  const countEl = document.getElementById("reviewCount");
  if (countEl) countEl.textContent = String(count);

  // Optional: show what was submitted (nice for confirmation page)
  const data = getQueryParams();
  renderSummary(data);
});
