import { IncomingMessage, ServerResponse } from "http";
import {
  findAll,
  findById,
  getLengthOfProducts,
  create,
  filterProduct,
} from "../models/productModels";

export const getProducts = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const products = await findAll();
    if (!products || products.length < 1) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
    }
    res.writeHead(200, { "Content-Type": "Application/json" });
    res.end(JSON.stringify(products));
  } catch (error: any) {
    if (error instanceof Error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error.message }));
    }
  }
};

export const getProduct = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const productId = req.url?.split("/")[req.url.split.length + 1];
    if (productId) {
      const product = await findById(Number(productId));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    if (error instanceof Error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error.message }));
    }
  }
};

export const createProduct = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const { len } = await getLengthOfProducts();
    let body: string = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { title, price, desc, available } = JSON.parse(body);
      const newProduct = {
        id: len + 1,
        title,
        price,
        desc,
        available,
      };
      const product = await create(newProduct);
      res.writeHead(201, { "COntent-Type": "application/json" });
      res.end(JSON.stringify(product));
    });
  } catch (error) {
    if (error instanceof Error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error.message }));
    }
  }
};

export const filterProductS = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  try {
    const baseUrl = `http://${req.headers.host}`;
    const fullUrl = new URL(req.url || "", baseUrl);
    const pathName = fullUrl.pathname;
    const priceRange = fullUrl.searchParams.get("price");
    const products = await filterProduct(Number(priceRange));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ path: pathName, products }));
  } catch (error) {
    if (error instanceof Error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: error.message }));
    }
  }
};
