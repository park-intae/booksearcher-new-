interface Book {
    id: number;
    title: string;
    author: string[];
    publisher: string;
    stock: number;
}

interface BookListProps {
    books: Book[];
    openModal: (type: string) => void;
}

export type { Book, BookListProps };