
interface ModalProps {
    isOpen: boolean;
    contentType: string;
    closeModal: () => void;
}

export default function Modal({ isOpen, contentType, closeModal }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div id="modal-background">
            <div id="contents">
                <div id="login">
                    login contents
                </div>
                <div id="modify">
                    modify contents
                </div>
                <div id="contents">
                    book contents
                </div>
            </div>
        </div>
    )
}