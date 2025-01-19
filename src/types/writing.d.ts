// the return type of things that go on at api/posts/
export interface FrontMatter {
  title: string;
  date: string;
  category: string;
  description: string;
  filename: string;
  excerpt: string;
}

// the microblog rendered out by the browser,
// the original object from firebase does not contain
// the formatted versions
export interface Microblog {
  id: string;
  content: string;
  time: string;
  formattedTime: string;
  formattedDate: string;
}
