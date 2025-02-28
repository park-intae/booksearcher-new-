import { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import Modal from './components/modal/Modal';
import type { Book } from './type/interface';

function App() {
  //Dummyfile
  const books: Book[] = [
    { id: 1, title: "책 1", author: ["작가 A"], publisher: "출판사 A", stock: 5 },
    { id: 2, title: "책 2", author: ["작가 B"], publisher: "출판사 B", stock: 2 },
    { id: 3, title: "책 3", author: ["작가 C"], publisher: "출판사 C", stock: 8 },
    { id: 4, title: "책 4", author: ["작가 D"], publisher: "출판사 D", stock: 7 },
    { id: 5, title: "책 5", author: ["작가 E"], publisher: "출판사 E", stock: 3 },]

  //Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentType, setContentType] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  //Modal open console
  const openModal = (type: string, book?: Book) => {
    setContentType(type);
    setSelectedBook(book ?? null); // book없으면 null로
    setIsModalOpen(true);
  };

  //Modal close console
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null); // 모달 닫으면서 초기화
  }


  return (
    <div>
      <header>
        <button onClick={() => openModal('loginButton')}>login</button>
      </header>
      <main>
        <div id='board'>
          <BookList books={books} openModal={openModal} />
          <div id='search'>search bar</div>
        </div>
        <div id='pagenation'></div>
      </main>

      {isModalOpen && <Modal isOpen={isModalOpen} contentType={contentType} openModal={openModal} closeModal={closeModal} book={selectedBook} />}
    </div>
  );
}

export default App;
