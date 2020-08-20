import React, { useEffect, useRef, useState } from 'react';

import { Modal } from 'react-bootstrap';

import './ConfirmationModal.css';

const ConfirmationModal = (props) => {
  const {
    showModal,
    hideModal,
    action,
    item,
    type,
    handleConfirm,
    handleCancel,
    confirmBtnColor,
    cancelBtnColor,
    confirmBtnBgColor,
    cancelBtnBgColor,
  } = props;
  const [confirmText, setConfirmText] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [isConfirming, setIsConfirming] = useState(props.isConfirming);
  const [isCancelling, setIsCancelling] = useState(props.isCancelling);

  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    setIsConfirming(props.isConfirming);
    return () => (isMountedRef.current = false);
  }, [props.isConfirming]);

  useEffect(() => {
    isMountedRef.current = true;
    setIsCancelling(props.isCancelling);
    return () => (isMountedRef.current = false);
  }, [props.isCancelling]);

  useEffect(() => {
    isMountedRef.current = true;
    switch (action.toLowerCase()) {
      case 'delete':
        setConfirmText(` Deleting ${type}`);
        break;
      case 'update':
        setConfirmText(` Updating ${type}`);
        break;
      case 'change':
        setConfirmText(` Changing ${type}`);
        break;
      default:
        throw new Error('Action not found');
    }
    setCancelText(` Cancelling ${action}`);
    return () => (isMountedRef.current = false);
  }, [action, type]);

  return (
    <div>
      <Modal
        show={showModal}
        onHide={hideModal}
        dialogClassName="ConfirmationModal"
        aria-labelledby="Confirmation Modal"
        dismissable
      >
        <Modal.Header>
          <div className="icon-box">
            <i className="material-icons">pan_tool</i>
          </div>
          <h4 className="modal-title">Are you sure?</h4>
        </Modal.Header>
        <Modal.Body>
          {item && (
            <>
              <p>
                Do you really want to {action.toLowerCase()}{' '}
                {type === 'user'
                  ? `${item.displayName}? This cannot be undone.`
                  : `${item}? This cannot be undone.`}
              </p>
              <div className="clearfix">
                <button
                  type="button"
                  className="btn cancelBtn"
                  onClick={handleCancel}
                  style={{
                    backgroundColor: `${cancelBtnBgColor}`,
                    color: `${cancelBtnColor}`,
                  }}
                >
                  {isCancelling ? `${cancelText}` : `Cancel`}
                </button>
                <button
                  type="button"
                  className="btn confirmBtn"
                  onClick={handleConfirm}
                  style={{
                    backgroundColor: `${confirmBtnBgColor}`,
                    color: `${confirmBtnColor}`,
                  }}
                >
                  {isConfirming ? `${confirmText}` : `${action}`}
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
