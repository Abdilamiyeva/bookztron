

function Modal({ message, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
