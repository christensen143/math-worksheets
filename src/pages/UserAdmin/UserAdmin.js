import React, { useContext, useReducer } from 'react';

import axios from 'axios';
import MaterialTable from 'material-table';

import { Button, Container } from 'react-bootstrap';

import ConfirmationModal from '../../modals/ConfirmationModal/ConfirmationModal';
import EditUserModal from '../../modals/EditUserModal/EditUserModal';
import AddUserModal from '../../modals/AddUserModal/AddUserModal';

import useGetUsers from '../../custom-hooks/useGetUsers';

import { AppContext } from '../../context/AppContext';

import capitalize from '../../helpers/capitalize';

import './UserAdmin.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_CONFIRMATION_MODAL':
      return {
        ...state,
        showConfirmationModal: action.showConfirmationModal,
        user: action.user,
      };
    case 'SHOW_EDIT_USER_MODAL':
      return {
        ...state,
        showEditUserModal: action.showEditUserModal,
        user: action.user,
      };
    case 'SHOW_ADD_USER_MODAL':
      return {
        ...state,
        showAddUserModal: action.showAddUserModal,
        user: action.user,
      };
    case 'SET_IS_CANCELLING':
      return { ...state, isCancelling: action.isCancelling };
    case 'SET_IS_CONFIRMING':
      return { ...state, isConfirming: action.isConfirming };
    case 'CLOSE_MODALS':
      return {
        ...state,
        showConfirmationModal: false,
        showEditUserModal: false,
        user: null,
        showError: false,
        errorMessage: '',
      };
    case 'SET_ERROR':
      return {
        ...state,
        showError: action.showError,
        errorMessage: action.errorMessage,
      };
    default:
      throw new Error('Unexpected action');
  }
};

const UserAdmin = () => {
  const [users, getUsers] = useGetUsers();

  const { idToken } = useContext(AppContext);

  const [data, dispatch] = useReducer(reducer, {
    showConfirmationModal: false,
    showEditUserModal: false,
    isConfirming: false,
    isCancelling: false,
    user: null,
    showError: false,
    errorMessage: null,
    showAddUserModal: false,
  });

  const {
    showConfirmationModal,
    showEditUserModal,
    isConfirming,
    isCancelling,
    user,
    showError,
    errorMessage,
    showAddUserModal,
  } = data;

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: true });
    const id = user.uid;
    await axios.delete(
      `https://us-central1-gerdau-forms.cloudfunctions.net/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: false });
    dispatch({ type: 'CLOSE_MODALS' });
    getUsers();
  };

  const handleEditUser = async (id, email, role, displayName) => {
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: true });
    try {
      const body = {
        email: email,
        role: role,
        displayName: displayName,
      };
      await axios.patch(
        `https://us-central1-gerdau-forms.cloudfunctions.net/api/users/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
    } catch (err) {
      dispatch({ type: 'SET_ERROR', showError: true, errorMessage: err });
    }
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: true });
    getUsers();
    handleCancel();
  };

  const handleAddUser = async (email, role, displayName, password) => {
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: true });
    try {
      const body = {
        email: email,
        role: role,
        displayName: displayName,
        password: password,
      };
      await axios
        .post(
          `https://us-central1-gerdau-forms.cloudfunctions.net/api/users`,
          body,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        )
        .then((data) => console.log(data));
    } catch (err) {
      dispatch({ type: 'SET_ERROR', showError: true, errorMessage: err });
    }
    dispatch({ type: 'SET_IS_CONFIRMING', isConfirming: true });
    getUsers();
    handleCancel();
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_IS_CANCELLING', isCancelling: true });
    dispatch({ type: 'CLOSE_MODALS' });
    dispatch({ type: 'SET_IS_CANCELLING', isCancelling: false });
  };

  const myData = users.map((user) => {
    return {
      displayName: user.displayName,
      email: user.email,
      role: capitalize(user.role),
      uid: user.uid,
      edit: (
        <Button
          variant="link"
          onClick={async () =>
            await dispatch({
              type: 'SHOW_EDIT_USER_MODAL',
              user: user,
              showEditUserModal: true,
            })
          }
        >
          View/Edit
        </Button>
      ),
      delete: (
        <Button
          variant="link"
          onClick={() =>
            dispatch({
              type: 'SHOW_CONFIRMATION_MODAL',
              user: user,
              showConfirmationModal: true,
            })
          }
        >
          Delete
        </Button>
      ),
    };
  });
  return (
    <>
      <Container className="UserAdmin">
        <div className="d-inline-block">
          <Button
            onClick={() =>
              dispatch({ type: 'SHOW_ADD_USER_MODAL', showAddUserModal: true })
            }
            variant="link"
          >
            <i className="material-icons md-48 mr-1">add_circle_outline</i>{' '}
            <span>Add User</span>
          </Button>
        </div>
        <MaterialTable
          columns={[
            {
              title: 'Name',
              field: 'displayName',
              defaultSort: 'asc',
            },
            { title: 'Email', field: 'email' },
            { title: 'Role', field: 'role' },
            { title: '', field: 'delete' },
            { title: '', field: 'edit' },
          ]}
          data={myData}
          options={{
            headerStyle: {
              backgroundColor: '#779ec3',
              color: '#FFFFFF',
              zIndex: 0,
            },
          }}
          title="User Admin"
          localization={{
            body: {
              emptyDataSourceMessage: 'Loading users...',
            },
          }}
        />
      </Container>
      <ConfirmationModal
        // id={id}
        showModal={showConfirmationModal}
        hideModal={handleCancel}
        action="Delete"
        item={user}
        type="user"
        handleConfirm={handleDeleteUser}
        handleCancel={handleCancel}
        isConfirming={isConfirming}
        isCancelling={isCancelling}
        confirmBtnBgColor="#f44336"
        confirmBtnColor="#fff"
        cancelBtnBgColor="#ccc"
        cancelBtnColor="#fff"
      />
      <EditUserModal
        showModal={showEditUserModal}
        hideModal={handleCancel}
        user={user}
        error={showError}
        errorMessage={errorMessage}
        handleEditUser={handleEditUser}
        handleCancel={handleCancel}
        isConfirming={isConfirming}
        isCancelling={isCancelling}
        confirmBtnBgColor="#f44336"
        confirmBtnColor="#fff"
        cancelBtnBgColor="#ccc"
        cancelBtnColor="#fff"
      />
      <AddUserModal
        showModal={showAddUserModal}
        hideModal={() =>
          dispatch({ type: 'SHOW_ADD_USER_MODAL', showAddUserModal: false })
        }
        error={showError}
        errorMessage={errorMessage}
        handleAddUser={handleAddUser}
        handleCancel={handleCancel}
        isConfirming={isConfirming}
        isCancelling={isCancelling}
        confirmBtnBgColor="#004a8f"
        confirmBtnColor="#fff"
        cancelBtnBgColor="#ccc"
        cancelBtnColor="#fff"
      />
    </>
  );
};

export default UserAdmin;
