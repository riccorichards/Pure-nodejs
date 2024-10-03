import { IncomingMessage, ServerResponse } from "http";
import postRouter from "./postHandlers";
import commentHandler from "./commentHandlers";
import authHandler from "./authHandler";

const router: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  "/": (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Welcome to RiccoBlog!!!" }));
  },
  "/signup": (req, res) => {
    const { method } = req;
    const handler = authHandler[method || "POST"];
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
    }
  },
  "/signin": (req, res) => {
    const { method } = req;
    const handler = authHandler[method || "POST"];
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
    }
  },
  "/posts": (req, res) => {
    const method = req.method || "GET";

    const handler = postRouter[method];

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
    }
  },
  "/comments": (req, res) => {
    const method = req.method || "GET";

    const handler = commentHandler[method];

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Method ${method} not allowed` }));
    }
  },
};

const notFoundHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
};

export { router, notFoundHandler };
