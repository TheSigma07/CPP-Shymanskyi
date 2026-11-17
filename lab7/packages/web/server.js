import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coreIndexPath = fileURLToPath(import.meta.resolve("@papercraft/core"));
const coreDir = path.dirname(coreIndexPath);

const ALLOWED_FILES = {
    "/": "index.html",
    "/index.html": "index.html",
    "/script.js": "script.js",
    "/style.css": "style.css",
    "/localStorageAdapter.js": "localStorageAdapter.js"
};

const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8"
};

export function createServer() {
    return http.createServer((req, res) => {
        const urlPath = req.url.split("?")[0];

        if (urlPath.includes("..")) {
            res.writeHead(404);
            return res.end("Not Found");
        }

        if (urlPath.startsWith("/node_modules/@papercraft/core/")) {
            const relFile = urlPath.replace("/node_modules/@papercraft/core/", "");
            const targetPath = path.resolve(coreDir, relFile);
            if (!targetPath.startsWith(coreDir) || !fs.existsSync(targetPath)) {
                res.writeHead(404);
                return res.end("Not Found");
            }
            res.writeHead(200, { "Content-Type": "application/javascript; charset=utf-8" });
            return fs.createReadStream(targetPath).pipe(res);
        }

        const fileName = ALLOWED_FILES[urlPath];
        if (!fileName) {
            res.writeHead(404);
            return res.end("Not Found");
        }

        const fullPath = path.join(__dirname, fileName);
        const ext = path.extname(fullPath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain" });
        fs.createReadStream(fullPath).pipe(res);
    });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const server = createServer();
    server.listen(3000, () => {
        console.log("Web client running at http://localhost:3000");
    });
}