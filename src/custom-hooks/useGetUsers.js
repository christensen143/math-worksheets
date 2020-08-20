import { useContext, useEffect, useReducer, useRef } from 'react';

import { AppContext } from '../context/AppContext';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return { ...state, users: [...state.users, action.user] };
    case 'SET_USERS':
      return { ...state, users: action.users };
    default:
      throw new Error('Action Not Found');
  }
};

const useGetUsers = () => {
  const isMountedRef = useRef(null);
  const [data, dispatch] = useReducer(reducer, {
    users: [],
  });
  const { users } = data;
  const { idToken } = useContext(AppContext);

  const getUsers = async () => {
    const res = await axios.get(
      'https://us-central1-gerdau-forms.cloudfunctions.net/api/users/',
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    dispatch({ type: 'SET_USERS', users: res.data.users });
  };

  useEffect(() => {
    isMountedRef.current = true;
    const getUsers = async () => {
      const res = await axios.get(
        'https://us-central1-gerdau-forms.cloudfunctions.net/api/users/',
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      dispatch({ type: 'SET_USERS', users: res.data.users });
    };
    getUsers();

    return () => (isMountedRef.current = false);
  }, [idToken]);

  return [users, getUsers];
};

export default useGetUsers;
