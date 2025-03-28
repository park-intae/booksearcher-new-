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
        <div className="mt-10">
            <h2 className="ml-10 text-2xl font-bold">책 정보 수정</h2>
            <div className="border w-8/12 h-fit mt-5 mx-auto rounded-md">
                <div className="ml-20">
                    <div className="mt-5 mb-2">
                        책 제목 : <input className="border" type="text" value={title} placeholder="새로운 제목 입력" onChange={(e) => setTitle(e.target.value)} /><br />
                    </div>
                    <div className="mb-2">
                        저자 : <input className="border" type="text" value={author} placeholder="저자 입력" onChange={(e) => setAuthor(e.target.value)} /><br />
                    </div>
                    <div className="mb-2">
                        출판사 : <input className="border" type="text" value={publisher} placeholder="출판사 입력" onChange={(e) => setPublisher(e.target.value)} /><br />
                    </div>
                    <div className="mb-5">
                        재고 : <input className="border" type="number" value={stock} placeholder="재고 입력" onChange={(e) => setStock(e.target.value)} /><br />
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4 mr-10">
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={saveHandler}>저장</button>
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={onClose}>취소</button>
            </div>
        </div>
    );
}

export default Modify