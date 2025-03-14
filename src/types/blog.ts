export interface Comment {
  id: string;
  content: string;
  author: string;
  date: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: Date;
  comments: Comment[];
  slug: string;
} 