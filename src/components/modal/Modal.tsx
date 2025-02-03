
export default function Modal() {

    function closeModal() {
        //여기에 css로 모달창을 닫는 코드
        console.log('close modal')
    }

    return (
        <div className="modal-background" onClick={closeModal}>
        </div>
    )
}