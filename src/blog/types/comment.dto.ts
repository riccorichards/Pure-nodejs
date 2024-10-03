export interface IncomingCommentData {
  author: string;
  comment: string;
  postId: number;
  likes: number;
}

export interface CommentType extends IncomingCommentData {
  id: number;
}
