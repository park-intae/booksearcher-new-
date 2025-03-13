import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import BookList from './components/BookList';
import Modal from './components/modal/Modal';
import type { Book } from './type/interface';
import Search from './components/board/Search';

function App() {
  //Dummyfile
  const [books, setBooks] = useState<Book[]>([
    // { id: 1, title: "책 1", author: ["작가 A"], publisher: "출판사 A", stock: 5 },
    // { id: 2, title: "책 2", author: ["작가 B"], publisher: "출판사 B", stock: 2 },
    // { id: 3, title: "책 3", author: ["작가 C"], publisher: "출판사 C", stock: 8 },
    // { id: 4, title: "책 4", author: ["작가 D"], publisher: "출판사 D", stock: 7 },
    // { id: 5, title: "책 5", author: ["작가 E"], publisher: "출판사 E", stock: 3 },
  ])

  //useState
  const [nextId, setNextId] = useState(6);

  //책 목록 가져오기
  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = () => {
    axios.get("http://localhost:3001/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.log("Error fetching books :", error));
  }

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

  //Save Book
  const handleSaveBook = async (updatedBook: Book) => {
    try {
      await axios.put(`http://localhost:3001/books/${updatedBook.id}`, updatedBook);
      setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    } catch (error) {
      console.log("Error updating book :", error);
    }
  }

  //Add Book
  const handleAddBook = (newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
    setNextId(prevId => prevId + 1);
  }

  //Delete Book
  const handleDeleteBook = async (id: number) => {

  }

  //Search State Management
  const [searchKey, setSearchKey] = useState<keyof Book>('title');
  const [searchValue, setSearchValue] = useState('');

  //Search
  const onSearch = (type: keyof Book, keyword: string) => {
    setSearchKey(type);
    setSearchValue(keyword);
  }
  //Search filter
  const filteredBooks = books.filter(book =>
    book[searchKey]?.toString().toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div>
      <header>
        {/* 로그인 버튼튼 */}
        <button onClick={() => openModal('loginButton')}>login</button>
      </header>
      <main>
        {/* 게시판 */}
        <div id='board'>
          <BookList books={filteredBooks} openModal={openModal} />
          {/* 검색, 추가 */}
          <Search onSearch={onSearch} />
          <button onClick={() => openModal('AddButton')}>추가</button>
        </div>
      </main>
      {/* 모달 */}
      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          contentType={contentType}
          openModal={openModal}
          closeModal={closeModal}
          book={selectedBook}
          onSave={handleSaveBook}
          nextId={nextId}
          onAdd={handleAddBook}
        />}
    </div>
  );
}

export default App;
