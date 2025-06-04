import { Terminal } from 'https://cdn.jsdelivr.net/npm/@xterm/xterm/+esm';
import {FitAddon} from 'https://cdn.jsdelivr.net/npm/@xterm/addon-fit/+esm';

const term = new Terminal({
    cursorBlink: true,
});

const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

export const terminal = { term, fitAddon };
