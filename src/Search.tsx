import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { useAjax, useLocalStorage } from "./library/hooks";
import { Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link, useParams } from "react-router-dom";
import { createBook } from "./library/functions";

function BookResults({ loading, res, error, books, setBooks }: any) {
  // let results = JSON.parse(localStorage.getItem("searchResults") as any);

  if (loading) {
    return <Spin />;
  }
  if (!res) {
    return <div>No data</div>;
  }

  if (res.status === 404) {
    return <div>Такие книги не найдены</div>;
  }

  return (
    <div>
      {res.map((el: any, index: number) => {
        return (
          <Card style={{ width: "100%" }} hoverable key={index}>
            <Meta title={el.title} description={el.author} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to={"book/" + index} style={{ width: "100%" }}>
                <Button
                  onClick={() => console.log(books)}
                  type="primary"
                  ghost
                  className="marginTop"
                  style={{ width: "100%" }}
                >
                  More
                </Button>
              </Link>
              <Button
                onClick={(e) => {
                  let book = res[index];
                  createBook(books, setBooks, book);
                }}
                type="primary"
                danger
                ghost
                className="marginTop"
              >
                Buy
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export function SearchBooks({ books, setBooks, setTempRes }: any) {
  let [search, setSearch] = useState<string>("");
  let [auto, setAuto] = useState<boolean>(false);
  let { res, error, loading } = useAjax(
    "https://poetrydb.org/title/" + search,
    "GET",
    auto
  );
  let [localRes, setLocalRes] = useLocalStorage("searchResults", "");

  useEffect(() => {
    if (typeof res == "undefined") {
      return setLocalRes(JSON.stringify({}));
    }
    setLocalRes(JSON.stringify(res));
  }, [res]);

  setTempRes(res);

  return (
    <div>
      <Input
        type="text"
        style={{ width: "calc(100% - 74px)" }}
        onChange={(e) => {
          setSearch(e.target.value);
          setAuto(false);
        }}
        placeholder="Поиск книг в дата базе и их добавление"
      />
      <Button
        onClick={(e) => {
          setAuto(true);
        }}
        type="primary"
        ghost
        className="marginTop"
      >
        Search
      </Button>
      <BookResults
        loading={loading}
        res={res}
        error={error}
        books={books}
        setBooks={setBooks}
      />
    </div>
  );
}
export function RandomBook({ books }: any) {
  let { id }: any = useParams();
  let temp = parseInt(id, 10);
  let book = books[temp];

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <DescriptionRender book={book} />
    </div>
  );
}
function DescriptionRender(book: any) {
  let initialValue = "";

  return (
    <p>
      {book.book.lines.reduce(
        (prev: string, next: string) => prev + next,
        initialValue
      )}
    </p>
  );
}

// Хочу чтобы сохранялись результаты поиска
