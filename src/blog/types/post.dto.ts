interface CommentOnPost {
  username: string;
  comment: string;
  profileImg: string;
}

export interface IncomingPostData {
  title: string;
  text: string;
  likes: number;
  author: string;
  tags: string[];
  image: string | null;
}

export interface PostType extends IncomingPostData {
  id: number;
}
