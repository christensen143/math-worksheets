import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './SuccessModal.css';

const SuccessModal = (props) => {
  const { showModal, hideModal } = props;
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    hideModal();
    setIsClosing(false);
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={hideModal}
        dialogClassName="SuccessModal"
        aria-labelledby="Success Modal"
      >
        <Modal.Header closeButton>
          <div className="icon-box">
            <i className="material-icons">done</i>
          </div>
          <h4 className="modal-title">Success!</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-3 body-text">
            Your form has been successfully submitted!
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <LoaderButton
              type="submit"
              isLoading={isClosing}
              text="Close"
              loadingText=" Closing..."
              onClick={handleClose}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuccessModal;
