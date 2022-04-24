import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Books from "./Books";
import Book from "./Book";
import { CreateBook } from "./CreateBooks";

import { Divider } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { SearchBooks, RandomBook } from "./Search";

import { useLocalStorage } from "./library/hooks";

import { BooksArray } from "./types/types";

function App() {
  let [localBooks, setLocalBooks] = useLocalStorage("books", "");

  let local = JSON.parse(localStorage.getItem("books") as string);

  if (!local) {
    local = [
      {
        id: 1,
        title: "In Search of Lost Time",
        author: "Marcel Proust",
        description:
          "Swann's Way, the first part of A la recherche de temps perdu, Marcel Proust's seven-part cycle, was published in 1913. In it, Proust introduces the themes that run through the entire work",
        img: "https://m.media-amazon.com/images/I/51tRkYYlpaL.jpg",
        isGiven: true,
        year: 2000,
      },
      {
        id: 2,
        title: "Ulysses",
        author: "James Joyce",
        description:
          "Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyss",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c0/UlyssesCover.jpg",
        isGiven: true,
        year: 2000,
      },
      {
        id: 3,
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        description:
          "Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper. He has become obsessed with books of chivalry, and believes",
        img: "https://images-na.ssl-images-amazon.com/images/I/91TrDFioSWL.jpg",
        isGiven: true,
        year: 2000,
      },
    ];
  }

  let [books, setBooks] = useState<BooksArray[]>(local);

  useEffect(() => {
    setLocalBooks(JSON.stringify(books));
  }, [books]);

  let [tempRes, setTempRes] = useState<BooksArray[]>();

  return (
    <div>
      <Router>
        <Link to="/">
          <HomeOutlined />
          <b>Home</b>
        </Link>
        <Divider type="vertical" />
        <Link to="/add_book">Create new Book</Link>
        <Divider type="vertical" />
        <Link to="/library">Books</Link>

        <Routes>
          <Route
            path="/"
            element={
              <SearchBooks
                setTempRes={setTempRes}
                books={books}
                setBooks={setBooks}
              />
            }
          />
          <Route
            path="/library"
            element={<Books books={books} setBooks={setBooks} />}
          />
          <Route
            path="add_book"
            element={<CreateBook books={books} setBooks={setBooks} />}
          />
          <Route
            path="/library/:id"
            element={<Book books={books} setBooks={setBooks} />}
          />
          <Route path="/book/:id" element={<RandomBook books={tempRes} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//https://poetrydb.org/title/Any

// Практическая работа №11-12: Создание веб-приложения с использованием React и Redux

// Задание.
// Сайт библиотеки (вспоминаем экзамен по JS)
// Возможности:
// •	Добавить книгу
// •	Удалить книгу
// •	Редактировать книгу
// •	Выдать книгу
// •	Вернуть книгу

// У книги должны быть следующие свойства: название, автор, год издательства, id, статус (выдана или нет).

// Дополнительно:
// •	Добавить работу с посетителями.
