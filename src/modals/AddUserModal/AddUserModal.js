import React, { useState } from 'react';

import { Alert, Form, Modal } from 'react-bootstrap';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './AddUserModal.css';

const AddUserModal = (props) => {
  const { showModal, hideModal, handleAddUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsConfirming(true);
    try {
      await handleAddUser(email, role, displayName, password).then(() => {
        setSuccess(true);
        setIsConfirming(false);
        setEmail('');
        setPassword('');
        setDisplayName('');
        setRole('');
      });
    } catch (e) {
      setError(true);
      setErrorMessage(e.message);
      setIsConfirming(false);
    }

    setIsConfirming(false);
  };

  const handleCancel = () => {
    setIsCancelling(true);
    hideModal();
    setIsCancelling(false);
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={hideModal}
        dialogClassName="AddUserModal"
        aria-labelledby="Add User Modal"
      >
        <Modal.Header closeButton>
          <div className="icon-box">
            <i className="material-icons">add</i>
          </div>
          <h4 className="modal-title">Add New User</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-4">
            <form autoComplete="off">
              <Form.Group controlId="vendor">
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
              <Form.Group controlId="acrsSftpPath">
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
              <Form.Group controlId="apsSftpPath">
                <Form.Label>
                  Password: <span className="required">(Required)</span>
                </Form.Label>

                <Form.Control
                  required
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
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
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <LoaderButton
              type="submit"
              isLoading={isConfirming}
              text="Add User"
              loadingText=" Adding user..."
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
          {success && (
            <Alert variant="success" dismissible="true">
              <p>New user has been successfully added!</p>
            </Alert>
          )}
          {error && (
            <Alert variant="danger" dismissable="true">
              {errorMessage}
            </Alert>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserModal;
