import React from 'react';

import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';

import Routes from './routing/Routes';

const App = () => {
  return (
    <div>
      <Container>
        <Header />
        <Routes />
      </Container>
    </div>
  );
};

export default App;
