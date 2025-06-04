import {terminal} from './terminal.js';
import socketManager from './websocket.js';
const { term, fitAddon } = terminal;

export function registerHandlers() {
    term.onData((data) => {
        const socket = socketManager.getSocket();
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            return;
        }

        socket.send(data);
    });

}
