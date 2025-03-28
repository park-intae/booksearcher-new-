import { useState } from "react";
import { Book } from "../../type/interface";
import BookContents from "../board/BookContents";
import Modify from "../board/Modify";
import Add from "../board/Add";

interface ModalProps {
    isOpen: boolean;
    contentType: string;
    closeModal: () => void;
    openModal: (type: string, book?: Book) => void;
    book: Book | null;
    onSave: (updatedBook: Book) => void;
    onAdd: (book: Book) => void;
}

export default function Modal({ isOpen, contentType, closeModal, openModal, onSave, onAdd, book }: ModalProps) {
    const [identify, setIdentify] = useState("");
    const [password, setPassword] = useState("");
    console.log('Modal 호출 - contentType:', contentType);

    const handleLogin = () => {
        console.log('로그인 시도:', { identify, password }); // 로그인 확인 >> 추후 서버로 전송하는 코드 기입
        closeModal();
    }

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isOpen) return null;
    return (
        <div id="modal-background" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center item-center" onClick={handleBackgroundClick}>
            <div className="h-96 w-1/2 mt-20 mx-auto bg-white p-6 rounded-lg shadow-lg" id="contents" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                    <button onClick={closeModal}>❌</button>
                </div>
                {/* 로그인 */}
                {contentType === 'loginButton' && (
                    <div className="mt-10">
                        <h2 className="ml-10 text-2xl font-bold">
                            Login window
                        </h2>
                        <div className="border w-8/12 h-fit mt-8 mx-auto rounded-md">
                            <div className="my-3 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                    ID
                                </div>
                                <input className="block min-w-0 grow ml-1 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="id입력" value={identify} onChange={(e) => setIdentify(e.target.value)} />
                            </div>
                            <div className="mb-3 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                                    PassWord
                                </div>
                                <input className="block min-w-0 grow ml-1 py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" type="password" placeholder="패스워드 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 mr-10">
                            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                )}
                {/* 책 내용 */}
                {contentType === 'bookContents' && (
                    book ? <BookContents book={book} openModal={openModal} onClose={closeModal} />
                        : <p>책 선택에 오류가 있습니다</p>
                )}
                {/* 수정 */}
                {contentType === 'modifyButton' && book && (
                    <Modify book={book} onClose={closeModal} onSave={onSave} />
                )}
                {/* 추가 */}
                {contentType === 'AddButton' && (
                    <Add onSave={onSave} onClose={closeModal} onAdd={onAdd} />
                )}

            </div>
        </div>
    )
}