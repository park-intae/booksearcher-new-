import { Book } from "../../type/interface";

interface ContentsProps {
    book: Book | null;
    onClose: () => void;
    openModal: (type: string, book?: Book) => void;
}

const BookContents: React.FC<ContentsProps> = ({ book, openModal, onClose }) => {
    if (!book) return <div></div>;

    return (
        <div className="mt-10">
            <h2 className="ml-10 text-2xl font-bold">책 정보</h2>
            <div className="border w-8/12 h-fit mt-5 mx-auto rounded-md ">
                <div className="ml-20">
                    <div className="mt-5 mb-2">
                        책 제목 : {book.title}
                    </div>
                    <div className="mb-2">
                        저자 : {book.author}
                    </div>
                    <div className="mb-2">
                        출판사 : {book.publisher}
                    </div>
                    <div className="mb-5">
                        재고 : {book.stock}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4 mr-10">
                <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={() => { onClose(); openModal('modifyButton', book); }}>
                    수정
                </button>
            </div>
        </div>
    )
}

export default BookContents