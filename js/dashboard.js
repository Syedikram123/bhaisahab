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
