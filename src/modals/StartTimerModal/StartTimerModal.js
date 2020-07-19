import React, { useState } from 'react';

import { Modal } from 'react-bootstrap';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './StartTimerModal.css';

const StartTimerModal = ({ showModal, hideModal }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    hideModal();
    setIsStarting(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      dialogClassName="StartTimerModal"
      aria-labelledby="Start Timer Modal"
    >
      <Modal.Header closeButton>
        <div className="icon-box">
          <i className="material-icons">alarm</i>
        </div>
        <h4 className="modal-title">Ready?</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="mt-3 body-text">
          When you click the "Start" button you will have 70 seconds to complete
          the test. A timer will appear in the upper-right hand corner to let
          you know how much time you have left. Good luck!
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-center">
          <LoaderButton
            type="submit"
            isLoading={isStarting}
            text="Start"
            loadingText=" Starting..."
            onClick={handleStart}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default StartTimerModal;
