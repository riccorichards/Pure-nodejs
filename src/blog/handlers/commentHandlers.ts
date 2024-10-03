import { IncomingMessage, ServerResponse } from "http";

const commentHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  GET: (req, res) => {},
  POST: (req, res) => {},
  PUT: (req, res) => {},
  DELETE: (req, res) => {},
};

export default commentHandler;
