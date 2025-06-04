import {terminal} from "../terminal.js";
import {themes} from "./themes.js";
const { term, fitAddon } = terminal;

export function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) {
        console.error(`Theme ${themeName} not found`);
        return;
    }

    term.options.theme = theme;
    localStorage.setItem("theme", themeName);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("theme") || "GruvboxDark";
    applyTheme(savedTheme);
    document.getElementById('themeSelect').value = savedTheme;

    document.getElementById('themeSelect').addEventListener('change', e => {
        applyTheme(e.target.value);
    });

});