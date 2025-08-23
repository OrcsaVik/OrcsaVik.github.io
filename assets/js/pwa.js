document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const themeStyle = document.getElementById("theme-style");

    themeToggle.addEventListener("click", () => {
        if (themeStyle.getAttribute("href").includes("dark.css")) {
            themeStyle.href = "/assets/css/light.css";
            themeToggle.textContent = "☀️";
        } else {
            themeStyle.href = "/assets/css/dark.css";
            themeToggle.textContent = "🌙";
        }
        localStorage.setItem("theme", themeStyle.href);
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        themeStyle.href = savedTheme;
        themeToggle.textContent = savedTheme.includes("dark.css") ? "🌙" : "☀️";
    }
});