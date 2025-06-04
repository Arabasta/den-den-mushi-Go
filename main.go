package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	_ "os"
	"os/exec"
	"runtime"

	"github.com/creack/pty"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func main() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", fs)
	// webSocket
	http.HandleFunc("/ws", handleWebSocket)

	port := 45005
	fmt.Printf("Server running on port %d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("WebSocket upgrade error:", err)
		return
	}
	defer func(ws *websocket.Conn) {
		err := ws.Close()
		if err != nil {
			log.Println("Error closing WebSocket:", err)
		} else {
			log.Println("WebSocket closed")
		}
	}(ws)

	shell := getShellCommand()
	cmd := exec.Command(shell)
	cmd.Env = append(os.Environ(), "TERM=xterm-256color")
	cmd.Dir = os.Getenv("HOME")

	// create pty
	ptmx, err := pty.Start(cmd)
	if err != nil {
		log.Println("Failed to start pty:", err)
		return
	}
	defer func() {
		_ = ptmx.Close()
		_ = cmd.Process.Kill()
	}()

	// read from pty and write to ws
	go func() {
		buf := make([]byte, 1024)
		for {
			n, err := ptmx.Read(buf)
			if err != nil {
				return
			}
			fmt.Println(string(buf[:n]))

			writeErr := ws.WriteMessage(websocket.TextMessage, buf[:n])
			if writeErr != nil {
				return
			}
		}
	}()

	// read from ws and write to pty
	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			break
		}
		fmt.Println(msg)
		_, _ = ptmx.Write(msg)
	}
}

func getShellCommand() string {
	if runtime.GOOS == "windows" {
		return "powershell.exe"
	}
	return "bash"
}
