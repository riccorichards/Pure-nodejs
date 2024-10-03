import { IncomingMessage, ServerResponse } from "http";
import AuthService from "../services/auth.service";

const service = new AuthService();

const authHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  POST: async (req, res) => {
    // target endpoint (te)
    const te = req.url;
    if (te === "/signup") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const authInfo = JSON.parse(body);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await service.SignUpService(authInfo), null, 2));
      });
    } else if (te === "/signin") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const authInfo = JSON.parse(body);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await service.LoginService(authInfo), null, 2));
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  },
};

export default authHandler;
