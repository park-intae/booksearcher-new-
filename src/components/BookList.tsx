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
    const booksPerPage = 5; // 페이지당 책 수

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

    const table = useReactTable({ data: sortedBooks, columns, getCoreRowModel: getCoreRowModel(), });

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
                        <tr key={row.id} onClick={() => {
                            openModal('bookContents', row.original);
                        }}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
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
