// Автоматически показывает текущий год в подвале сайта

const year = document.getElementById("current-year");

if (year) {
    year.textContent = new Date().getFullYear();
}
