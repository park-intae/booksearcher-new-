import React, { useMemo } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { Book, BookListProps } from '../type/interface';

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
                        <tr key={row.id} onClick={() => openModal('bookDetails')}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
