import React from 'react';
import './ItemModal.css'
import { Modal } from 'react-bootstrap';

const ItemModal = ({ showModal, handleCloseModal, modalProduct, quantity, setQuantity, handleConfirmQuantity }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='product-information'>
        <img src={modalProduct?.image}></img>
        <p>{modalProduct?.name}</p>
        </div>

        <div>
            <p>Quantity:</p>       
            <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"/>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleConfirmQuantity}>Confirm Quantity</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
