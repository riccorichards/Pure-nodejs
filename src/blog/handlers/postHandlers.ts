import { IncomingMessage, ServerResponse } from "http";
import PostService from "../services/post.service";

const service = new PostService();

const postRouter: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  GET: async (req, res) => {
    try {
      if (req.url?.includes("?")) {
        const fullUrl = new URL(`http://localhost:3000${req.url}`);
        const queryId = fullUrl.searchParams.get("id");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify(
            await service.getPostByIdService(Number(queryId)),
            null,
            2
          )
        );
      } else {
        const posts = await service.getAllPostService(); // Fetch posts from the service
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(posts, null, 2)); // Send the posts back in the response
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to fetch posts" }, null, 2));
    }
  },
  POST: async (req, res) => {
    try {
      let body: string = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const post = JSON.parse(body);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(await service.createPostService(post), null, 2));
      });
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to create post" }, null, 2));
    }
  },
  PUT: async (req, res) => {
    try {
      const fullUrl = new URL(`http://localhost:3000${req.url}`);
      const queryId = Number(fullUrl.searchParams.get("id"));
      const likedQ = fullUrl.searchParams.get("isUser");

      if (likedQ) {
        
      }
      let body: string = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const post = JSON.parse(body);
        const updatedPost = await service.updatePostService(queryId, post);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedPost, null, 2));
      });
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to update post" }, null, 2));
    }
  },
  DELETE: async (req, res) => {
    try {
      const fullUrl = new URL(`http://localhost:3000${req.url}`);
      const queryId = Number(fullUrl.searchParams.get("id"));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(await service.deletePostService(queryId), null, 2)
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to delete post" }, null, 2));
    }
  },
};

export default postRouter;
