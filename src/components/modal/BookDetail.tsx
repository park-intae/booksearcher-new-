import Modal from "./Modal";


export default function BookDetail() {
    return (
        <div>
            <Modal isOpen={isModalOpen} contentType={contentType} closeModal={closeModal} />
        </div>
    )
}