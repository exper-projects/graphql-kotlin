import React from "react";
import { BooksList } from "./features/books/BooksList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GraphQL Books Management</h1>
        <p>React + Redux Toolkit + GraphQL</p>
      </header>
      <main>
        <BooksList />
      </main>
    </div>
  );
}

export default App;
