import { terminal } from "../terminal.js";
const { term, fitAddon } = terminal;

let currentFontSize = parseInt(localStorage.getItem("fontSize")) || 16;
const minFontSize = 8;
const maxFontSize = 30;

export function applyFontSize(fontSize) {
    currentFontSize = fontSize;
    term.options.fontSize = fontSize;
    localStorage.setItem("fontSize", fontSize);
    document.getElementById('fontSizeDisplay').textContent = `${fontSize}px`;
    fitAddon.fit();
}

document.addEventListener('DOMContentLoaded', () => {
    applyFontSize(currentFontSize);

    document.getElementById('decreaseFont').addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            applyFontSize(currentFontSize - 1);
        }
    });

    document.getElementById('increaseFont').addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            applyFontSize(currentFontSize + 1);
        }
    });
});
