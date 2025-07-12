const btn = document.getElementById('enterBtn');
const clickSound = document.getElementById('clickSound');
const video = document.getElementById('bg-video');
const title = document.getElementById("pageTitle");
let pressTimer;

const allowedKnights = {
  apexion: "175025",
  velox: "2275025",
  luminari: "1275025",
  kairos: "1175025",
  spectra: "1975025"
};

btn.addEventListener('click', () => {
  const nameInput = document.getElementById('knightName').value.toLowerCase();
  const codeInput = document.getElementById('knightCode').value;
  const error = document.getElementById('error');

  // Reset error message display
  error.style.display = "none";

  if (!nameInput || !codeInput) {
    error.innerText = "❌ Please enter both Knight Name and Code";
    error.style.display = "block";
    return;
  }

  if (!allowedKnights[nameInput]) {
    error.innerText = "❌ Knight not found";
    error.style.display = "block";
    return;
  }
  if (allowedKnights[nameInput] !== codeInput) {
    error.innerText = "❌ Wrong code for this Knight";
    error.style.display = "block";
    return;
  }

  // ✅ Success
  localStorage.setItem('knightName', nameInput);
  localStorage.setItem('knightCode', codeInput);
  clickSound.play();
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
});


// 2. Enable video sound on any click
document.body.addEventListener("click", () => {
  video.muted = false;
});


// 3. Long Press Admin Access (Mobile & Desktop Compatible)
title.style.userSelect = "none";
title.style.webkitUserSelect = "none";

// For Mobile
title.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => {
    window.location.href = "admin.html"; // Hidden admin panel
  }, 5000);
});

title.addEventListener("touchend", () => {
  clearTimeout(pressTimer);
});

// For Desktop
title.addEventListener("mousedown", () => {
  pressTimer = setTimeout(() => {
    window.location.href = "admin.html";
  }, 5000);
});

title.addEventListener("mouseup", () => {
  clearTimeout(pressTimer);
});