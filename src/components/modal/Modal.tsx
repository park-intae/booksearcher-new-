import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    contentType: string;
    closeModal: () => void;
}

export default function Modal({ isOpen, contentType, closeModal }: ModalProps) {
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
                        ID : <input></input>
                        PassWord: <input></input>
                    </div>
                )}
                {contentType === 'modifyButton' && (
                    <div className="modal-section"></div>
                )}
                {contentType === 'bookContents' && (
                    <div className="modal-section"></div>
                )}
            </div>
        </div>
    )
}