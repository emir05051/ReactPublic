import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { getValue } from "./library/functions";

import "./App.css";

import { BooksArray } from "./types/types";

function GetBook(books: BooksArray[]) {
  const { id } = useParams();
  const book = books.find(
    (book: BooksArray) => book.id === parseInt(id as string)
  );
  return book;
}

function Book({ books, setBooks }: any) {
  const book = GetBook(books) as BooksArray;
  let [change, setChange] = useState<boolean>(false);
  return (
    <div className="book">
      <img src={book.img} alt="img" />
      <div className="bookContent">
        <h1 style={change ? { display: "none" } : { display: "block" }}>
          {book.title}
        </h1>
        <h3 style={change ? { display: "none" } : { display: "block" }}>
          Written by {book.author}
        </h3>
        <p style={change ? { display: "none" } : { display: "block" }}>
          {book.description}
        </p>
        <div
          style={
            change
              ? { display: "flex", flexDirection: "column" }
              : { display: "none" }
          }
        >
          <Input type="text" defaultValue={book.title} id="bookTitle" />
          <Input type="text" defaultValue={book.author} id="bookAuthor" />
          <TextArea
            defaultValue={book.description}
            style={{ width: "100%", height: 500 }}
            id="bookDescription"
          ></TextArea>
        </div>
        <Button
          onClick={() => {
            book.title = getValue("bookTitle");
            book.author = getValue("bookAuthor");
            book.description = getValue("bookDescription");

            let temp = [...books];
            setBooks(temp);

            setChange(!change);
          }}
        >
          Change
        </Button>
      </div>
    </div>
  );
}

export default Book;
