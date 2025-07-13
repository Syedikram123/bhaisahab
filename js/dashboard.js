// 🔒 Secure Dashboard Access
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
  localStorage.removeItem("knightName");
  localStorage.removeItem("knightCode");
  window.location.href = "index.html";
}

// ✅ Display Knight Name in Dashboard Header
document.addEventListener("DOMContentLoaded", () => {
   calculateArkonoxDate();
  updateClock();
  setInterval(() => {
    calculateArkonoxDate();
    updateClock();
  }, 1000);

  const knightNameSpan = document.getElementById("knightNameSpan");
  const nameDisplay = document.getElementById("knightNameDisplay");
  const welcomeText = document.getElementById("welcomeText");

  if (knightName && knightNameSpan && nameDisplay && welcomeText) {
    knightNameSpan.innerText = capitalize(knightName);
    nameDisplay.innerText = `Welcome, ${capitalize(knightName)}`;

    const knightUI = {
      apexion: "🔥 Fire style",
      luminari: "🌟 Light style",
      kairos: "⏳ Time style",
      spectra: "🌈 Prism style"
    };
    const style = knightUI[knightName.toLowerCase()] || "🛡️ Default Knight";
    welcomeText.innerText += ` | ${style}`;
  }

  // Load or initialize progress
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

  // Load selected sword
  const savedSword = localStorage.getItem(`sword_${knightName}`);
  if (savedSword) {
    const msg = document.getElementById("swordSelectedMsg");
    if (msg) msg.innerHTML = `✅ You previously chose: <b>${savedSword}</b>`;
  }

  // Sword selection handler
  document.querySelectorAll('.sword-card').forEach(card => {
    card.addEventListener('click', () => {
      const sword = card.dataset.sword;
      localStorage.setItem(`sword_${knightName}`, sword);
      const msg = document.getElementById("swordSelectedMsg");
      if (msg) msg.innerHTML = `🛡️ You selected: <b>${sword}</b>`;
    });
  });
});

// ✅ Helper: Capitalize name
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// ✅ Section Switching Function
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");

  if (section === 'home') {
    document.getElementById("homeSection").style.display = "block";
  } else if (section === 'sword') {
    document.getElementById("swordSection").style.display = "block";
  } else {
    console.warn("Unknown section:", section);
  }
}

console.log("KnightName in localStorage:", localStorage.getItem("knightName"));

// 🧠 Arkonox Date Calculator
function calculateArkonoxDate() {
  const startDate = new Date("2025-08-01T00:00:00Z");
  const now = new Date();
  const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  const moons = [
    "Arkodu", "Lumivale", "Zereth", "Mytherion", "Caelora",
    "Nexoria", "Solthir", "Velmora", "Duskveil", "Crystalis",
    "Frosthollow", "Aetheron", "Grimspire", "Novarise", "Ignarok",
    "Obscuron", "Xandria", "Thalvarin", "Virelia", "Elyndor",
    "Drakor", "Quorath", "Sytherra", "Yllarith", "Zephyros"
  ];

  const dayNames = ["Raiz", "Auron", "Izan", "Zoro", "Omax"];
  const moonIndex = Math.floor(diffDays / 30);
  const dayInMoon = diffDays % 30;
  const phase = Math.floor(dayInMoon / 5) + 1;
  const dayName = dayNames[dayInMoon % 5];
  const moonName = moons[moonIndex] || "Unknown";

  const arkoDate = `${moonName} ${phase} ${dayName}`;
  document.getElementById("arkonoxDate").innerText = `Arkonox Date: ${arkoDate}`;
}

function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-GB"); // HH:MM:SS
  document.getElementById("earthClock").innerText = `Time: ${timeStr}`;
}

document.addEventListener("DOMContentLoaded", () => {
  calculateArkonoxDate();
  updateClock();
  setInterval(() => {
    calculateArkonoxDate();
    updateClock();
  }, 1000);
});
