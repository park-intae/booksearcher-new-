import { Book } from "../../type/interface";

interface ContentsProps {
    book: Book | null;
    onClose: () => void;
    openModal: (type: string, book?: Book) => void;
}

const BookContents: React.FC<ContentsProps> = ({ book, openModal, onClose }) => {
    if (!book) return <div></div>;

    return (
        <div>
            <h2>책 정보</h2>
            책 제목 : {book.title}<br />
            저자 : {book.author}<br />
            출판사 : {book.publisher}<br />
            재고 : {book.stock}<br />
            <button onClick={() => { onClose(); openModal('modifyButton', book); }}>
                수정
            </button>
        </div>
    )
}

export default BookContents