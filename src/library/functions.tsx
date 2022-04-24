import { BooksArray } from "../types/types";
import { SearchBooks } from "../types/types";

export function createBook(
  books: BooksArray[],
  setBooks: any,
  book?: SearchBooks | boolean,
  title?: string,
  author?: string,
  description?: string,
  img?: string,
  date?: string
) {
  if (book) {
    title = (book as SearchBooks).title;
    author = (book as SearchBooks).author;
    let initialValue = "";
    description = (book as SearchBooks).lines.reduce(
      (prev: string, next: string) => prev + next,
      initialValue
    );
  }

  const match = checkTitle(title, books);
  if (match) {
    return;
  }

  let tempBooks = [
    ...books,
    {
      id: getId(books),
      author,
      title: title ?? "Undefined",
      description,
      img:
        img ??
        "https://www.pngfind.com/pngs/m/57-574845_darth-vader-darth-vader-no-background-hd-png.png",
      isGiven: true,
      year: date ?? "2022",
    },
  ];
  console.log(tempBooks);

  setBooks(tempBooks);
}
function getId(books: BooksArray[]) {
  let last: any = Object.entries(books);
  if (last.length > 0) {
    last = last[last.length - 1];
    return last[1].id + 1;
  }
  return 0;
}
function checkTitle(title: string | undefined, books: any[]): boolean {
  return books.find((book: any) => book.title === title);
}

export function getValue(id: string): string {
  return (document.getElementById(id) as HTMLInputElement).value;
}
