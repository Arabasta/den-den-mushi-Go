import {terminal} from "../terminal.js";
const { term } = terminal;

export function applyFont(font) {
    term.options.fontFamily = font;
    localStorage.setItem("font", font);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedFont = localStorage.getItem("font") || "Courier New";
    applyFont(savedFont);
    document.getElementById('fontSelect').value = savedFont;

    document.getElementById('fontSelect').addEventListener('change', e => {
        applyFont(e.target.value);
    });
});
