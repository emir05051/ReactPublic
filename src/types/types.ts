export type BooksArray = {
  id: number;
  title: string;
  author: string;
  description: string;
  img: string;
  isGiven: boolean;
  year: number;
};
export type SearchBooks = {
  author: string;
  linecount: string;
  lines: string[];
  title: string;
};
