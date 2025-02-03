import React from 'react';
import type { Book, BookListProps } from '../type/interface';

const books: Book[] = [
    { id: 1, title: "책 1", author: ["작가 A"], publisher: "출판사 A", stock: 5 },
    { id: 2, title: "책 2", author: ["작가 B"], publisher: "출판사 B", stock: 2 },
    { id: 3, title: "책 3", author: ["작가 C"], publisher: "출판사 C", stock: 8 },
];

const BookList: React.FC<BookListProps> = ({ books }: { books: Book[] }) => {
    return (
        <div id='booklist'>
            {books.map((book) => (
                <div key={book.id} className='book'>
                    <h3>{book.title}</h3>
                    <p>{book.author.join(', ')}</p>
                    <p>{book.publisher}</p>
                    <p>{book.stock}</p>
                </div>
            ))}
        </div>
    );
}

export default BookList;