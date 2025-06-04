import {toggleSettingsMenu} from "./settings/settingsMenu.js";
import socketManager from './websocket.js';
import {registerHandlers} from './handlers.js';
import showAsciiArt from "./welcome.js";
import { terminal } from './terminal.js';

const { term, fitAddon } = terminal;

document.addEventListener('DOMContentLoaded', () => {
    const terminalElement = document.getElementById('terminal');

    if (!terminalElement) {
        console.error('Terminal container not found!');
        return;
    }

    term.open(terminalElement);
    fitAddon.fit();

    showAsciiArt(term);
    socketManager.connect();
    registerHandlers();

    // handle window resize
    window.addEventListener('resize', () => {
        try {
            fitAddon.fit();
        } catch (e) {
            console.error('Fit error:', e);
        }
    });
});