document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("citation-modal");
  const contentEl = document.getElementById("citation-content");
  const closeBtn = modal.querySelector(".citation-close");
  const backdrop = modal.querySelector(".citation-backdrop");

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    contentEl.textContent = ""; // optional: clear
  }

  // Attach click handlers to all citation buttons
  document.querySelectorAll(".citation-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const src = btn.getAttribute("data-cite-src");
      if (!src) return;

      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to load citation");
        const text = await res.text();
        contentEl.textContent = text;
        openModal();
      } catch (err) {
        contentEl.textContent = "Failed to load citation.";
        openModal();
        console.error(err);
      }
    });
  });

  // Close interactions
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
});
