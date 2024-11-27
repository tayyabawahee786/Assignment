const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;
const zlib = require('zlib');
const status = require("express-status-monitor");

app.use(status());

// Compress metakey.txt to metakey.zip
fs.createReadStream('./metakey.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./metakey.zip'));

// Serve hi.pdf
app.get("/", (req, res) => {
    fs.readFile("./hi.pdf", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
        } else {
            res.end(data);
        }
    });
});

// Serve metakey.txt
app.get("/about", (req, res) => {
    fs.readFile("./metakey.txt", (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
        } else {
            res.end(data);
        }
    });
});

// Stream hi.pdf
app.get("/streamcheck", (req, res) => {
    const stream = fs.createReadStream("./hi.pdf");
    stream.on('data', (chunk) => res.write(chunk));
    stream.on("end", () => res.end());
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});