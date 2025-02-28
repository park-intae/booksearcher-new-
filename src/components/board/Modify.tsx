import type { Book } from "../../type/interface";

interface ModifyProps {
    book: Book | null;
    onClose: () => void;
}

const Modify: React.FC<ModifyProps> = ({ book, onClose }) => {

    if (!book) return <div></div>;

    return (
        <div>
            <h2>책 정보 수정</h2>
            <input type="text" defaultValue={book.title} placeholder="새로운 제목 입력" />
            <input type="text" defaultValue={book.author} placeholder="저자 입력" />
            <input type="text" defaultValue={book.publisher} placeholder="출판사 입력" />
            <input type="number" defaultValue={book.stock} placeholder="재고 입력" />
            <button>저장</button>
            <button onClick={onClose}>취소</button>
        </div>
    );
}

export default Modify