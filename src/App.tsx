import React from 'react';
import './App.css';
import BookList from './components/BookList';
import type { Book, BookListProps } from './type/interface';

function App() {

  const books: Book[] = [
    { id: 1, title: "책 1", author: ["작가 A"], publisher: "출판사 A", stock: 5 },
    { id: 2, title: "책 2", author: ["작가 B"], publisher: "출판사 B", stock: 2 },
    { id: 3, title: "책 3", author: ["작가 C"], publisher: "출판사 C", stock: 8 },]

  return (
    <div>
      <header><button id='login'>login</button></header>
      <main>
        <div id='board'>
          <BookList books={books} />
          <div id='search'>search bar</div>
          <button id='modi'>수정</button>
        </div>
        <div id='pagenation'></div>
      </main>
    </div>
  );
}

export default App;
