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
}

export default function Modal({ isOpen, contentType, closeModal, openModal, onSave, book }: ModalProps) {
    const [identify, setIdentify] = useState("");
    const [password, setPassword] = useState("");
    console.log('Modal 호출 - contentType:', contentType);

    const handleLogin = () => {
        console.log('로그인 시도:', { identify, password }); // 로그인 확인 >> 추후 서버로 전송하는 코드 기입
        closeModal();
    }

    if (!isOpen) return null;
    return (
        <div id="modal-background" onClick={closeModal}>
            <div id="contents" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal} className="close-byn">❌</button>
                {/* 로그인 */}
                {contentType === 'loginButton' && (
                    <div className="modal-section">
                        ID : <input placeholder="id입력" value={identify} onChange={(e) => setIdentify(e.target.value)} />
                        <br />
                        PassWord: <input type="password" placeholder="패스워드 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
                {/* 책 내용 */}
                {contentType === 'bookContents' && book ? (
                    <BookContents book={book} openModal={openModal} onClose={closeModal} />
                ) : contentType === "bookContents" && !book ? (
                    <p>책 선택에 오류가 있습니다</p>
                ) : null}
                {/* 수정 */}
                {contentType === 'modifyButton' && book && (
                    <Modify book={book} onClose={closeModal} onSave={onSave} />
                )}
                {/* 추가 */}
                {contentType === 'AddButton' && (
                    <Add onClose={closeModal} onSave={onSave} />
                )}

            </div>
        </div>
    )
}