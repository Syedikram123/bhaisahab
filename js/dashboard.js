// 🔒 Secure Access
const knightName = localStorage.getItem("knightName");
const knightCode = localStorage.getItem("knightCode");

const allowedKnights = {
  apexion: "175025",
  velox: "2275025",
  luminari: "1275025",
  kairos: "1175025",
  spectra: "1975025"
};

if (
  !knightName ||
  !knightCode ||
  !allowedKnights[knightName.toLowerCase()] ||
  allowedKnights[knightName.toLowerCase()] !== knightCode
) {
  localStorage.clear();
  window.location.href = "index.html";
}

// ✅ After Page Loads
document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Knight Display
  const knightNameSpan = document.getElementById("knightNameSpan");
  const nameDisplay = document.getElementById("knightNameDisplay");
  const welcomeText = document.getElementById("welcomeText");

  if (knightName && knightNameSpan && nameDisplay && welcomeText) {
    const formatted = capitalize(knightName);
    knightNameSpan.innerText = formatted;
    nameDisplay.innerText = `Welcome, ${formatted}`;

    const knightUI = {
      apexion: "🔥 Fire style",
      luminari: "🌟 Light style",
      kairos: "⏳ Time style",
      spectra: "🌈 Prism style"
    };
    welcomeText.innerText += ` | ${knightUI[knightName.toLowerCase()] || "🛡️ Default Knight"}`;
  }

  // 📅 Live Updates
  updateDashboard();
  setInterval(updateDashboard, 1000);

  // 🗡️ Sword selection
  const savedSword = localStorage.getItem(`sword_${knightName}`);
  if (savedSword) {
    const msg = document.getElementById("swordSelectedMsg");
    if (msg) msg.innerHTML = `✅ You previously chose: <b>${savedSword}</b>`;
  }

  document.querySelectorAll(".sword-card").forEach(card => {
    card.addEventListener("click", () => {
      const sword = card.dataset.sword;
      localStorage.setItem(`sword_${knightName}`, sword);
      const msg = document.getElementById("swordSelectedMsg");
      if (msg) msg.innerHTML = `🛡️ You selected: <b>${sword}</b>`;
    });
  });

  // 📊 Progress Tracking
  const progressKey = `progress_${knightName}`;
  const savedProgress = localStorage.getItem(progressKey);
  if (!savedProgress) {
    const newProgress = {
      currentMoon: "Moon 1 - Awakening",
      totalXP: 0,
      dailyTaskStreak: 0,
      notes: [],
      sword: "Basic Blade"
    };
    localStorage.setItem(progressKey, JSON.stringify(newProgress));
  }
});

// 🧠 Helper
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// 🚀 Navigation Tabs
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  if (section === "home") document.getElementById("homeSection").style.display = "block";
  if (section === "sword") document.getElementById("swordSection").style.display = "block";
  if (section === "tasks") document.getElementById("taskSection").style.display = "block";
  if (section === "chat") document.getElementById("chatSection").style.display = "block";
}

// ⏱️ Full Arkonox + Earth Calendar System
function updateDashboard() {
  const now = new Date();

  const arkonoxDateEl = document.getElementById("arkonoxDate");
  const earthDateEl = document.getElementById("earthDate");
  const earthClockEl = document.getElementById("earthClock");

  // 🧮 Arkonox Date
  const start = new Date("2025-07-01T00:00:00Z");
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const moons = [
    "Arkodu", "Lumivale", "Zereth", "Mytherion", "Caelora",
    "Nexoria", "Solthir", "Velmora", "Duskveil", "Crystalis",
    "Frosthollow", "Aetheron", "Grimspire", "Novarise", "Ignarok",
    "Obscuron", "Xandria", "Thalvarin", "Virelia", "Elyndor",
    "Drakor", "Quorath", "Sytherra", "Yllarith", "Zephyros"
  ];
  const dayNames = ["Raiz", "Auron", "Izan", "Zoro", "Omax"];
  const romanPhases = ["I", "II", "III", "IV", "V", "VI"];

  if (diffDays < 0) {
    arkonoxDateEl.innerText = `Arkonox Date: Not Started (Begins July 1)\n              (0/750)`;
  } else {
    const moonIndex = Math.floor(diffDays / 30);
    const dayInMoon = diffDays % 30;
    const phaseIndex = Math.floor(dayInMoon / 5);
    const moonName = moons[moonIndex] || "Unknown";
    const dayName = dayNames[dayInMoon % 5];
    const romanPhase = romanPhases[phaseIndex] || "?";

    arkonoxDateEl.innerText = `Arkonox Date: ${moonName} ${romanPhase} ${dayName}\n              (${diffDays + 1}/750)`;
  }

  // 🌍 Earth Date
  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const weekday = now.toLocaleString("default", { weekday: "long" });
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 0);
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));

  earthDateEl.innerText = `Earth Date: ${month} ${day} ${weekday} – ${year}\n              (${dayOfYear}/365)`;

  // 🕒 Time
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  earthClockEl.innerText = `Time: ${hh}:${mm}:${ss}`;
}
