# Den Den Mushi
Browser-based Terminal emulator for easy low latency shell access to cloud compute instances

![example.gif](../den-den-mushi/assets/example.gif)

## Features
- Run all commands through a web browser
- Dark and light themes
- Linux, MacOS, Windows support

## Prerequisites

```bash
sudo yum install -y nodejs

# required for node-pty
sudo yum groupinstall "Development Tools" -y
sudo yum install gcc-c++ make -y
```

## Running

1. Clone the repository
```bash
git clone https://github.com/Arabasta/den-den-mushi.git
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```