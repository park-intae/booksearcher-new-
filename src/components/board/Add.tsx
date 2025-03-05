import { useState } from "react";
import type { Book } from "../../type/interface";

interface AddProps {
    onClose: () => void;
    onSave: (updatedBook: Book) => void;
    nextId: number;
}

const Add: React.FC<AddProps> = ({ onClose, onSave, nextId }) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisehr] = useState("");
    const [stock, setStock] = useState("0");

    const saveHandler = () => {
        const updatedBook: Book = {
            id: nextId,
            title,
            author: author ? author.split(",").map(name => name.trim()) : [],
            publisher,
            stock: parseInt(stock, 10),
        };
        onSave(updatedBook);
        onClose();
    }

    return (
        <div>
            <h2>책 추가</h2>
            책 제목 : <input type="text" value={title} placeholder="제목 입력" onChange={(e) => setTitle(e.target.value)} /><br />
            저자 : <input type="text" value={author} placeholder="저자 입력" onChange={(e) => setAuthor(e.target.value)} /><br />
            출판사 : <input type="text" value={publisher} placeholder="출판사 입력" onChange={(e) => setPublisehr(e.target.value)} /><br />
            재고 : <input type="number" value={stock} placeholder="재고 입력" onChange={(e) => setStock(e.target.value)} /><br />
            <button onClick={saveHandler}>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
}

export default Add