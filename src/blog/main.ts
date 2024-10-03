import { createServer, IncomingMessage, ServerResponse } from "http";
import config from "./config";
import {
  router as routeHandler,
  notFoundHandler,
} from "./handlers/routeHandler";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const fullUrl = new URL(`http://localhost:3000${req.url}`);

  const pathName = fullUrl.pathname;

  const handler = routeHandler[pathName] || notFoundHandler;

  handler(req, res);
});

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
