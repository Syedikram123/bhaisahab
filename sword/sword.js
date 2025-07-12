document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.sword-card');
  const swordMsg = document.getElementById('swordMsg');
  const knight = localStorage.getItem('knightName');

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const selectedSword = card.getAttribute("data-sword");

      // Save sword to localStorage
      localStorage.setItem(`sword_${knight}`, selectedSword);

      swordMsg.innerHTML = `🛡️ <b>${selectedSword}</b> selected as your sword for this moon.`;
    });
  });

  // Show previously selected sword if exists
  const saved = localStorage.getItem(`sword_${knight}`);
  if (saved) {
    swordMsg.innerHTML = `✅ You previously chose: <b>${saved}</b>`;
  }
});
