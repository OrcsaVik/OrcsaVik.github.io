深色 / 浅色模式切换

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeStyle = document.getElementById("theme-style");

    themeToggle.addEventListener("click", () => {
        const current = themeStyle.getAttribute("href");
        const isDark = current.includes("dark.css");
        themeStyle.setAttribute("href", isDark ? "/assets/css/light.css" : "/assets/css/dark.css");
        localStorage.setItem("theme", isDark ? "light" : "dark");
    });

    // 页面加载时读取主题
    const saved = localStorage.getItem("theme") || "dark";
    themeStyle.setAttribute("href", `/assets/css/${saved}.css`);
});