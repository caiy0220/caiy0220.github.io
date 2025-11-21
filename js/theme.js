(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const iconSpan = toggleBtn.querySelector(".icon");
  const labelSpan = toggleBtn.querySelector(".label");

  function updateToggleUI() {
    const isDark = root.dataset.theme === "dark";
    iconSpan.textContent = isDark ? "☀️" : "🌙";
    labelSpan.textContent = isDark ? "Light" : "Dark";
    toggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    updateToggleUI();
  }

  // Initialize theme from localStorage or system preference
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    root.dataset.theme = storedTheme;
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    root.dataset.theme = "dark";
  } else {
    root.dataset.theme = "light";
  }
  updateToggleUI();

  // Toggle on click
  toggleBtn.addEventListener("click", function () {
    const isDark = root.dataset.theme === "dark";
    setTheme(isDark ? "light" : "dark");
  });

  // Set footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
