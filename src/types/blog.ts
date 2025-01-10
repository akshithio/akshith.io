export interface FrontMatter {
  title: string;
  date: string;
  category: string;
  description: string;
}

export interface BlogPostMatter {
  title: string;
  category: string;
  date: string;
  url: string;
  description?: string;
  filename: string;
}
