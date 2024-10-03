import comment from "../localDb/comment";
import PostRepository from "../repositories/post.repo";
import { IncomingPostData, PostType } from "../types/post.dto";

class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  async getAllPostService() {
    return this.repository.getPosts();
  }

  async createPostService(input: IncomingPostData) {
    const postLen = (await this.repository.lengthOfPosts()) || 0;
    const newPost = {
      id: postLen < 1 ? 0 : postLen + 1,
      ...input,
    };

    return await this.repository.createPost(newPost);
  }

  async getPostByIdService(postId: number) {
    return await this.repository.getPostById(postId);
  }

  async updatePostService(postId: number, input: PostType) {
    return await this.repository.updatePost(postId, input);
  }

  async deletePostService(postId: number) {
    return await this.repository.deletePost(postId);
  }
}

export default PostService;
