const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 8000;

const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
    const requestPath = req.url === "/" ? "/index.html" : req.url;
    const safePath = path.normalize(requestPath).replace(/^(\.\.[\\/])+/, "");
    const filePath = path.join(root, safePath);

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
            return;
        }

        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
        res.end(data);
    });
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
