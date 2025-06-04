import { applyTheme} from "./themeSettings.js";
import {applyFont} from "./fontSettings.js";
import {applyFontSize} from "./fontSizeSettings.js";
import {enablePuTTYCopyPaste, disablePuTTYCopyPaste} from "./copyPasteSettings.js";

export function toggleSettingsMenu() {
    const menu = document.getElementById('settingsMenu');
    menu.classList.toggle('show');
}

// close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('settingsMenu');
    const button = document.getElementById('menuButton');
    if (!menu.contains(e.target) && e.target !== button) {
        menu.classList.remove('show');
    }
});

document.getElementById('menuButton').addEventListener('click', toggleSettingsMenu);
