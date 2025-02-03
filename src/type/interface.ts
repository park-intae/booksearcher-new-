interface Book {
    id: number;
    title: string;
    author: string[];
    publisher: string;
    stock: number;
}

interface BookListProps {
    books: Book[];
}

export type { Book, BookListProps };