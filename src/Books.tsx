import React from "react";
import { Link } from "react-router-dom";

import { Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";

import "./App.css";
import "antd/dist/antd.css";

import { BooksArray } from "./types/types";

function getTitle(element: any): string {
  if (element.classList.contains("ant-card-meta-title")) {
    return element.innerHTML;
  }
  return getTitle(element.childNodes[0]);
}

function findTitle(pressedElement: any, index: number = 0): string {
  if (pressedElement.classList.contains("ant-card-body")) {
    return getTitle(pressedElement);
  }

  return findTitle(pressedElement.parentNode);
}

function deleteBook(title: string, books: BooksArray[], setBooks: any) {
  const book = books.find((book: any) => book.title === title);
  let index: number = books.indexOf(book as BooksArray);
  books.splice(index, 1);
  let temp = [...books];
  setBooks(temp);
}

function Books({ books, setBooks }: any) {
  return (
    <div>
      <div className="wrapper">
        {books.map((el: any, idx: number) => {
          return (
            <div key={idx}>
              <Card
                style={{
                  width: 250,
                  padding: "5px",
                  backgroundColor: "#BCD2EE",
                }}
                hoverable
                cover={
                  <img
                    src={el.img}
                    style={{ borderRadius: "5px" }}
                    width="100px"
                    height="320px"
                    alt="img"
                  />
                }
              >
                <Meta title={el.title} description={el.author} />
                <h5>{el.year}</h5>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button type="primary" ghost className="marginTop">
                    <Link to={"" + el.id}>More</Link>
                  </Button>
                  <Button
                    onClick={(e) => {
                      let title = findTitle(e.target);
                      deleteBook(title, books, setBooks);
                    }}
                    type="primary"
                    danger
                    className="marginTop"
                  >
                    Return
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Books;
