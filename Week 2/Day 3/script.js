const imageIcon = document.querySelector('.imageIcon');
const main = document.querySelector('.main');


let currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme); 

function applyTheme(theme) {
    if (theme === "dark") {
        main.classList.remove('light');
        main.classList.add('dark');
        imageIcon.setAttribute('src', 'dark.png');
    } else {
        main.classList.remove('dark');
        main.classList.add('light');
        imageIcon.setAttribute('src', 'light.jpeg');
    }
}

function toggleTheme() {
    const newTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
}


window.addEventListener('storage', (e) => {
    if (e.key === "theme") {
        applyTheme(e.newValue);
    }
});