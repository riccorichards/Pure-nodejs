import { createServer } from "http";
import { readFile } from "fs";
import path from "path";

createServer(function (req, res) {
  const url = req.url;

  switch (url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
      break;
    case "/home":
      // Construct the correct file path
      const filePath = path.join(__dirname, "public", "home.html");

      // Read the file asynchronously
      readFile(filePath, (err, data) => {
        if (err) {
          // Handle the error if file not found or other issues
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("404 Not Found");
        }

        // Write headers and send the file content once it's read
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
      break;
    default:
      if (url?.includes("/images")) {
        let filePath = path.join(__dirname, "public", "images", "nicolas.webp");

        readFile(filePath, (err, img) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Image Not Found!");
          } else {
            res.writeHead(200, { "Content-Type": "image/webp" });
            res.end(img);
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
      }
  }
}).listen(3500, () => {
  console.log("Server is listening on port 3500");
});
