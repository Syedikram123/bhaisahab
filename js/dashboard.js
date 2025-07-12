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
  const knightName = localStorage.getItem("knightName");
  const knightNameSpan = document.getElementById("knightNameSpan");

  if (knightName && knightNameSpan) {
    knightNameSpan.innerText = capitalize(knightName);
  }



  // ✅ Load saved progress if exists
  const progressKey = `progress_${knightName}`;
  const savedProgress = localStorage.getItem(progressKey);
  const defaultProgress = {
  currentMoon: "Moon 1 - Awakening",
  totalXP: 0,
  streak: 0,
  notes: [],
  sword: "Basic Blade"
};
const knightUI = {
  apexion: "🔥 Fire style",
  luminari: "🌟 Light style",
  kairos: "⏳ Time style",
  spectra: "🌈 Prism style"
};

const style = knightUI[knightName.toLowerCase()];
document.getElementById("welcomeText").innerText += ` | ${style}`;


  if (savedProgress) {
    const data = JSON.parse(savedProgress);
    console.log("Knight Progress:", data);
    // You can use this data to show XP, tasks, notes etc.
  } else {
    // Create default progress
    const newProgress = {
      currentMoon: "Moon 1 - Awakening",
      totalXP: 0,
      dailyTaskStreak: 0,
      notes: []
    };
    localStorage.setItem(progressKey, JSON.stringify(newProgress));
  }
});

// ✅ Helper: Capitalize name
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
console.log("KnightName in localStorage:", localStorage.getItem("knightName"));
function viewStats() {
  const progress = JSON.parse(localStorage.getItem(`progress_${knightName}`));
  alert(`XP: ${progress.totalXP} | Moon: ${progress.currentMoon}`);
}
