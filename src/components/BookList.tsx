import React, { useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Book } from '../type/interface';

interface BookListProps {
    books: Book[];
    openModal: (type: string, book?: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, openModal }) => {

    const sortedBooks = React.useMemo(() => {
        return [...books].sort((a, b) => a.id - b.id);
    }, [books]);

    const columns = useMemo<ColumnDef<Book, any>[]>(() => [
        { header: '제목', accessorKey: 'title' },
        { header: '작가', accessorKey: 'author' },
        { header: '출판사', accessorKey: 'publisher' },
        { header: '재고', accessorKey: 'stock' },
    ], []);

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
                            {/* <button onClick={() => { openModal('modifyButton', row.original) }}>
                                수정
                            </button> 수정 기능 만들면 BookContents 내부로 보낼 예정 */}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default BookList;
