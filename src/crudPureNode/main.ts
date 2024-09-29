import { createServer } from "http";
import {
  getProducts,
  getProduct,
  createProduct,
  filterProductS,
} from "./controllers/productController";

const server = createServer((req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/api/products") {
    getProducts(req, res);
  } else if (method === "GET" && url?.match(/\/api\/product\/([0-9]+)/)) {
    getProduct(req, res);
  } else if (method === "POST" && url === "/api/product") {
    createProduct(req, res);
  } else if (method === "GET" && url?.includes("/api/products?")) {
    filterProductS(req, res);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
