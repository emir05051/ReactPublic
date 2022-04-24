import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { createBook, getValue } from "./library/functions";

export function CreateBook({ books, setBooks }: any) {
  return (
    <div className="createBook marginTop">
      <label htmlFor="title">
        title
        <Input type="text" id="title" placeholder="title" allowClear />
      </label>
      <label htmlFor="author">
        author
        <Input type="text" id="author" placeholder="title" allowClear />
      </label>
      <label htmlFor="description">
        Description
        <TextArea
          placeholder="Description"
          id="description"
          autoSize
          allowClear
        />
      </label>
      <label htmlFor="image">
        image
        <Input placeholder="URL" id="image" allowClear />
      </label>
      <label htmlFor="date">
        Date
        <Input placeholder="Только год" id="date" allowClear />
      </label>
      <Button
        onClick={(e) => {
          let title: string | undefined = getValue("title");
          let author: string = getValue("author");
          let description: string = getValue("description");
          let img: string | undefined = getValue("image");
          let date: string | undefined = getValue("date");

          img = img === "" ? undefined : img;
          title = title === "" ? "undefined" : title;
          date = date === "" ? undefined : date;

          createBook(
            books,
            setBooks,
            false,
            title,
            author,
            description,
            img,
            date
          );
        }}
      >
        Create
      </Button>
    </div>
  );
}
