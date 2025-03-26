import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import BookList from './components/BookList';
import Modal from './components/modal/Modal';
import type { Book } from './type/interface';
import Search from './components/board/Search';

function App() {
  const [books, setBooks] = useState<Book[]>([])

  //책 목록 가져오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.log("책 목록을 가져오지 못했습니다. 오류코드 :", error);
      }
    }
    fetchBooks();
  }, [])

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
    console.log("수정할 책 정보:", updatedBook);
    console.log("idKey 값 확인:", updatedBook.idKey);
    if (!updatedBook.idKey) {
      console.error("❌ idKey가 없습니다! 책을 수정할 수 없습니다.");
      return;
    }

    try {
      console.log("Updating book with ID:", updatedBook.idKey);
      await axios.put(`http://localhost:5000/books/${updatedBook.idKey}`, updatedBook);
      setBooks(prevBooks => prevBooks.map(book => book.idKey === updatedBook.idKey ? updatedBook : book));
      closeModal();
    } catch (error) {
      console.log("책을 저장하지 못했습니다. 오류코드 :", error);
    }
  }

  //Add Book
  // 랜덤 idKey 생성
  const generateIdKey = () => {
    return Math.random().toString(36).substring(2, 9);
  };
  // 책 추가 handle
  const handleAddBook = async (newBook: Book) => {
    const idKey = generateIdKey();
    const id = books.length + 1;

    const bookWithId = { ...newBook, idKey, id };

    try {
      await axios.post("http://localhost:5000/books", bookWithId);
      setBooks(prevBooks => [...prevBooks, newBook]);
    } catch (error) {
      console.log("책을 추가하지 못했습니다. 오류코드 :", error);
    }
  }

  //Delete Book
  const handleDeleteBook = async (idKey: string) => {
    if (idKey === undefined) {
      console.log("책을 제거하지 못했습니다. id가 없습니다.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/books/${idKey}`);
      setBooks(prevBooks => prevBooks.filter(book => book.idKey !== idKey));
    } catch (error) {
      console.log("책을 제거하지 못했습니다. 오류코드 :", error);
    }
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
  const filteredBooks = searchValue.trim()
    ? books.filter(book => book[searchKey]?.toString().toLowerCase().includes(searchValue.toLowerCase()))
    : books;


  return (
    <div>
      <header className="flex justify-end">
        {/* 로그인 버튼 */}
        <button
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-3 py-1.5 me-2 mb-2'
          onClick={() => openModal('loginButton')
          }>login</button>
      </header>
      <main>
        <div className='ml-9'>
          {/* 게시판 */}
          <div id='board'>
            <BookList books={filteredBooks} openModal={openModal} onDelete={handleDeleteBook} />
            {/* 검색, 추가 */}
            <div className='flex'>
              <Search onSearch={onSearch} />
              <button className="ml-auto mr-20 mt-2.5 border h-full px-2 py-1 rounded-md hover:bg-gray-300" onClick={() => openModal('AddButton')}>추가</button>
            </div>
          </div>
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
          onAdd={handleAddBook}
        />}
    </div>
  );
}

export default App;
