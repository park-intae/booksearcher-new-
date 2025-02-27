import { useState } from "react";
import { Book } from "../../type/interface";
import BookContents from "../board/BookContents";

interface ModalProps {
    isOpen: boolean;
    contentType: string;
    closeModal: () => void;
    book: Book | null;
}

export default function Modal({ isOpen, contentType, closeModal, book }: ModalProps) {
    const [identify, setIdentify] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log('로그인 시도:', { identify, password }); // 로그인 확인 >> 추후 서버로 전송하는 코드 기입
        closeModal();
    }

    if (!isOpen) return null;

    return (
        <div id="modal-background" onClick={closeModal}>
            <div id="contents" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal} className="close-byn">❌</button>

                {contentType === 'loginButton' && (
                    <div className="modal-section">
                        ID : <input placeholder="id입력" value={identify} onChange={(e) => setIdentify(e.target.value)} />
                        <br />
                        PassWord: <input type="password" placeholder="패스워드 입력" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                )}
                {/* {contentType === 'modifyButton' && book && (
                    <Modify book={book} onClose={closeModal} />
                )} 수정 기능 만들면 BookContents 내부로 보낼 예정*/}
                {contentType === 'bookContents' && book ? (
                    <BookContents book={book} onClose={closeModal} />
                ) : contentType === "bookContents" && !book ? (
                    <p>책 선택에 오류가 있습니다</p>
                ) : null}

            </div>
        </div>
    )
}