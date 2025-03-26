import { useState } from "react";
import type { Book } from "../../type/interface";

interface ModifyProps {
    book: Book | null;
    onClose: () => void;
    onSave: (updatedBook: Book) => void;
}

const Modify: React.FC<ModifyProps> = ({ book, onClose, onSave }) => {
    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(Array.isArray(book?.author) ? book?.author.join(",") : book?.author);
    const [publisher, setPublisher] = useState(book?.publisher || "");
    const [stock, setStock] = useState(book?.stock.toString() || "");

    if (!book) return null;

    const saveHandler = () => {
        const updatedBook: Book = {
            idKey: book.idKey,
            title,
            author: author ? author.split(",").map(name => name.trim()) : [],
            publisher,
            stock: parseInt(stock, 10),
        };
        console.log("저장할 책 정보:", updatedBook);
        onSave(updatedBook);
        onClose();
    }

    return (
        <div>
            <h2>책 정보 수정</h2>
            책 제목 : <input type="text" value={title} placeholder="새로운 제목 입력" onChange={(e) => setTitle(e.target.value)} /><br />
            저자 : <input type="text" value={author} placeholder="저자 입력" onChange={(e) => setAuthor(e.target.value)} /><br />
            출판사 : <input type="text" value={publisher} placeholder="출판사 입력" onChange={(e) => setPublisher(e.target.value)} /><br />
            재고 : <input type="number" value={stock} placeholder="재고 입력" onChange={(e) => setStock(e.target.value)} /><br />
            <button onClick={saveHandler}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
}

export default Modify