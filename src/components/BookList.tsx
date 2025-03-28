import React, { useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Book } from '../type/interface';
import Pagination from './board/Pagination';


interface BookListProps {
    books: Book[];
    openModal: (type: string, book?: Book) => void;
    onDelete: (idKey: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, openModal, onDelete }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const booksPerPage = 10; // 페이지당 책 수

    const sortedBooks = React.useMemo(() => {
        return [...books].sort((a, b) => {
            const idA = a.id ?? NaN; // undefined일 경우 NaN 처리
            const idB = b.id ?? NaN; // undefined일 경우 NaN 처리
            return (idA - idB); // NaN 처리로 undefined가 맨 뒤로 배치됨
        });
    }, [books]);

    const columns = useMemo<ColumnDef<Book, any>[]>(() => [
        { header: 'ID', accessorKey: 'id' },
        { header: '제목', accessorKey: 'title' },
        { header: '작가', accessorKey: 'author' },
        { header: '출판사', accessorKey: 'publisher' },
        { header: '재고', accessorKey: 'stock' },
        {
            header: '삭제',
            cell: ({ row }) => {
                const idKey = row.original.idKey;
                return (
                    <button onClick={(e) => {
                        e.stopPropagation();
                        if (idKey !== undefined) {
                            onDelete(idKey);
                        }
                    }}>삭제</button>
                )
            }
        },
    ], [onDelete]);

    const paginatedBooks = React.useMemo(() => {
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        return sortedBooks.slice(startIndex, endIndex);
    }, [currentPage, sortedBooks, booksPerPage]);

    const table = useReactTable({ data: paginatedBooks, columns, getCoreRowModel: getCoreRowModel(), });

    return (
        <div id='booklist' className='w-11/12'>
            <h2 className='text-left text-lg mb-5'>도서 목록</h2>
            <table className='w-full text-center table-fixer border ml-7 mb-3'>
                {/* 표 항목 */}
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(columns => (
                                <th className="p-2 border-b bg-gray-300" key={columns.id}>
                                    {flexRender(columns.column.columnDef.header, columns.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {/* 표 내용 */}
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className='text-center border-b' key={row.id} onClick={() => {
                            openModal('bookContents', row.original);
                        }}>
                            {row.getVisibleCells().map(cell => (
                                <td className='pt-1 pb-1' key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalBooks={books.length}
                booksPerPages={booksPerPage}
                currentPage={currentPage}
                paginate={setCurrentPage}
            />
        </div>
    );
}

export default BookList;
