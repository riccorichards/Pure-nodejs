import post from "../localDb/post";
import { PostType } from "../types/post.dto";
import { BadRequestError, NotFoundError } from "../utils/errorHandlers";
import Tools from "../utils/tools";
import { promises as fs } from "node:fs";
import path from "node:path";

class PostRepository {
  private tools: Tools;

  constructor() {
    this.tools = new Tools();
  }

  async getPosts() {
    try {
      return await post;
    } catch (error) {
      this.tools.handleError(error);
    }
  }

  async lengthOfPosts() {
    try {
      const posts = await this.getPosts(); // Wait for the posts data
      return posts ? posts.length : 0; // Return 0 if posts is undefined or null
    } catch (error) {
      this.tools.handleError(error); // Log or handle the error
    }
  }

  async createPost(input: PostType) {
    try {
      post.push(input);
      const filePath = path.join(__dirname, "../localDb/post.ts");
      await fs.writeFile(
        filePath,
        `export default ${JSON.stringify(post)}`,
        "utf8"
      );
      return input;
    } catch (error) {
      this.tools.handleError(error);
    }
  }

  async getPostById(postId: number) {
    try {
      const posts = await this.getPosts();
      if (!posts) throw new BadRequestError();

      return await posts.find((post) => post.id === postId);
    } catch (error) {
      this.tools.handleError(error);
    }
  }

  async updatePost(postId: number, input: PostType) {
    const updatedPost = await this.getPostById(postId);
    if (!updatedPost) throw new NotFoundError();
    updatedPost.title = input.title ? input.title : updatedPost.title;
    updatedPost.text = input.text ? input.text : updatedPost.text;

    const postIndex = post.findIndex((p) => p.id === input.id);
    post[postIndex] = updatedPost;
    const filePath = path.join(__dirname, "../localDb/post.ts");
    await fs.writeFile(
      filePath,
      `export default ${JSON.stringify(post)}`,
      "utf8"
    );
    return updatedPost;
  }

  async likedOrDislike(postId: number, userId: number) {
    
  }

  async deletePost(postId: number) {
    const postIndex = post.findIndex((p) => p.id === postId);
    if (postIndex === -1) throw new NotFoundError();
    post.splice(postIndex, 1);
    const filePath = path.join(__dirname, "../localDb/post.ts");
    await fs.writeFile(
      filePath,
      `export default ${JSON.stringify(post)}`,
      "utf8"
    );
    return true;
  }
}

export default PostRepository;
