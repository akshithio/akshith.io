export interface FrontMatter {
  title: string;
  date: string;
  category: string;
  description: string;
}

export interface BlogPostMatter {
  title: string;
  date: string;
  category: string;
  description?: string;
  url: string;
  filename: string;
}
