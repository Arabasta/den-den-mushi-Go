import { terminal } from '../terminal.js';
const { term } = terminal;

let selectionChangeDisposable;
let pasteHandler;

export function enablePuTTYCopyPaste() {
    // clean up existing listeners
    disablePuTTYCopyPaste();

    // handle copy
    selectionChangeDisposable = term.onSelectionChange(() => {
        const text = term.getSelection();
        if (text) {
            navigator.clipboard.writeText(text).catch(err => {
                console.error('Copy failed:', err);
            });
        }
    });

    // handle paste
    pasteHandler = async (e) => {
        e.preventDefault();
        try {
            const clipboard = await navigator.clipboard.readText();
            term.paste(clipboard);
        } catch (err) {
            console.error('Paste failed:', err);
        }
    };
    term.element.addEventListener('contextmenu', pasteHandler);
}

export function disablePuTTYCopyPaste() {
    // remove copy listener
    if (selectionChangeDisposable) {
        selectionChangeDisposable.dispose();
        selectionChangeDisposable = null;
    }

    // remove paste listener
    if (pasteHandler) {
        term.element.removeEventListener('contextmenu', pasteHandler);
        pasteHandler = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('puttyCopyPasteToggle');
    if (!toggle) return;

    const enabled = localStorage.getItem('puttyCopyPaste') === 'true';
    toggle.checked = enabled;

    if (enabled) {
        enablePuTTYCopyPaste();
    }

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        localStorage.setItem('puttyCopyPaste', isEnabled);

        if (isEnabled) {
            enablePuTTYCopyPaste();
        } else {
            disablePuTTYCopyPaste();
        }

        console.log(`PuTTY copy/paste ${isEnabled ? 'enabled' : 'disabled'}`);
    });
});