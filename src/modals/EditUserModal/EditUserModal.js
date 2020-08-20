import React, { useEffect, useRef, useState } from 'react';

import { Form, Modal } from 'react-bootstrap';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import capitalize from '../../helpers/capitalize';

import './EditUserModal.css';

const EditUserModal = (props) => {
  const { showModal, hideModal, handleCancel } = props;
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCancelling, setIsCancelling] = useState(props.isCancelling);

  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    setIsCancelling(props.isCancelling);
    setIsConfirming(props.isConfirming);
    if (props.user) {
      setEmail(props.user.email);
      setDisplayName(props.user.displayName);
      setRole(capitalize(props.user.role));
      setId(props.user.uid);
    }

    return () => (isMountedRef.current = false);
  }, [props]);

  const handleSubmission = (e) => {
    e.preventDefault();
    props.handleEditUser(id, email, role, displayName);
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={hideModal}
        dialogClassName="EditUserModal"
        aria-labelledby="Add User Modal"
      >
        <Modal.Header closeButton>
          <div className="icon-box">
            <i className="material-icons">edit</i>
          </div>
          <h4 className="modal-title">{displayName}</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-4">
            <Form.Group controlId="displayName">
              <Form.Label>
                Display Name: <span className="required">(Required)</span>
              </Form.Label>

              <Form.Control
                required
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email: <span className="required">(Required)</span>
              </Form.Label>

              <Form.Control
                required
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>
                Role: <span className="required">(Required)</span>
              </Form.Label>

              <Form.Control
                as="select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option>Choose...</option>
                <option>Admin</option>
                <option>User</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <LoaderButton
              type="submit"
              isLoading={isConfirming}
              text="Update User"
              loadingText=" Updating user..."
              onClick={handleSubmission}
            />{' '}
            <LoaderButton
              type="submit"
              isLoading={isCancelling}
              text="Cancel"
              loadingText=" Cancelling..."
              variant="outline-secondary"
              onClick={handleCancel}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditUserModal;
