export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListData {
  posts: Post[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface GetPostsParams {
  keyword?: string;
  cursor?: number;
  size?: number;
}
