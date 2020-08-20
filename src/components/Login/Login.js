import React, { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import { Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function (error) {
        // Handle Errors here.
        setError(true);
        setErrorMessage(error.message);
      });
    setIsLoading(false);
  };

  return (
    <div className="Login">
      <form onSubmit={handleSignIn}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
          />
        </Form.Group>
        <Link to="/login/reset">Forgot Password?</Link>
        <LoaderButton
          block
          // disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text="Login"
          loadingText=" Logging in..."
        />
      </form>
      {error && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
};

export default Login;
