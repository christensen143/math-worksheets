import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './TimeoutModal.css';

const TimeoutModal = ({
  showModal,
  hideModal,
  numCorrect,
  numProblems,
  message,
  icon,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    hideModal();
    setIsClosing(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      dialogClassName="TimeoutModal"
      aria-labelledby="Timeout Modal"
    >
      <Modal.Header closeButton>
        <div className="icon-box">
          <i className="material-icons">{icon}</i>
        </div>
        <h4 className="modal-title">{message}</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-3 body-text">
          You answered {numCorrect} correct out of {numProblems}.
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
  );
};

export default TimeoutModal;
