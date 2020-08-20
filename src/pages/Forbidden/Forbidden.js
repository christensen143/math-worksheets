import React, { useEffect, useRef, useState } from 'react';

import { Container } from 'react-bootstrap';

import { Redirect } from 'react-router-dom';

import './Forbidden.css';

export default () => {
  const isMountedRef = useRef(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;

    setTimeout(() => setRedirect(true), 3000);

    return () => (isMountedRef.current = false);
  }, []);

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <div className="Forbidden">
        <h4>
          You do not have the appropriate permissions to access this page.
        </h4>
        <p>You will be redirected to the homepage in 5 seconds.</p>
      </div>
    </Container>
  );
};
