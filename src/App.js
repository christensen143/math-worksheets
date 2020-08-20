import React from 'react';

import Loader from 'react-loader-spinner';

import { Container } from 'react-bootstrap';

import Header from './components/Header/Header';

import Routes from './routing/Routes';

import { AppProvider } from './context/AppContext';

import useAuth from './custom-hooks/useAuth';

const App = () => {
  const { initializing, user } = useAuth();

  if (initializing) {
    return (
      <div
        style={{
          width: '100%',
          height: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader type="ThreeDots" color="#ff6700" height="80" width="80" />
      </div>
    );
  }

  return (
    <div>
      <AppProvider value={{ user }}>
        <Container>
          <Header />
          <Routes />
        </Container>
      </AppProvider>
    </div>
  );
};

export default App;
