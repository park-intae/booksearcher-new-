import React, { useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Book, BookListProps } from '../type/interface';
import { get } from 'http';

const books: Book[] = [
    { id: 1, title: "책 1", author: ["작가 A"], publisher: "출판사 A", stock: 5 },
    { id: 2, title: "책 2", author: ["작가 B"], publisher: "출판사 B", stock: 2 },
    { id: 3, title: "책 3", author: ["작가 C"], publisher: "출판사 C", stock: 8 },
    { id: 4, title: "책 4", author: ["작가 D"], publisher: "출판사 D", stock: 7 },
    { id: 5, title: "책 5", author: ["작가 E"], publisher: "출판사 E", stock: 3 },
];

// useMemo로 index기준 정렬
const filteredBooks = React.useMemo(() => {
    return books.filter(book => book.stock >= 5);
}, [books]);

const sortedBooks = React.useMemo(() => {
    return [...filteredBooks].sort((a, b) => a.stock - b.stock);
}, [filteredBooks]);

const columns = useMemo<ColumnDef<Book, any>[]>(() => [
    { header: '제목', accessorKey: 'title' },
    { header: '작가', accessorKey: 'author' },
    { header: '출판사', accessorKey: 'publisher' },
    { header: '재고', accessorKey: 'stock' },
], []);

const table = useReactTable({ data: sortedBooks, columns, getCoreRowModel: getCoreRowModel(), });

const BookList: React.FC<BookListProps> = ({ books }: { books: Book[] }) => {
    return (
        <div id='booklist'>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(columns => (
                                <th key={columns.id}>
                                    {flexRender(columns.column.columnDef.header, columns.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {books.map((book) => (
                <div key={book.id} className='book'>
                    <h3>{book.title}</h3>
                    <p>{book.author.join(', ')}</p>
                    <p>{book.publisher}</p>
                    <p>{book.stock}</p>
                </div>
            ))} */}
        </div>
    );
}

export default BookList;