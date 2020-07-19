import React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

// import allActions from '../../state/actions';

// import Home from '../../pages/Home/Home';
// import Setup from '../../pages/Setup/Setup';

// import Footer from '../Footer/Footer';

import './Navigation.css';

const Navigation = () => {
  // const dispatch = useDispatch();

  // const activeTab = useSelector((state) => state.navigation.activeTab);

  // const handleSelect = (key) => {
  //   dispatch(allActions.navigationActions.setActiveTab(key));
  // };

  return (
    <div className="Navigation">
      <Navbar bg="custom" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/setup">Setup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

    // <>
    //   <div className="m-4">
    //     <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
    //       <Nav variant="tabs">
    //         <Nav.Item>
    //           <Nav.Link eventKey={'home'}>Home</Nav.Link>
    //         </Nav.Item>
    //         <Nav.Item>
    //           <Nav.Link eventKey={'setup'}>Setup</Nav.Link>
    //         </Nav.Item>
    //       </Nav>
    //       <Tab.Content>
    //         <Tab.Pane eventKey={'home'}>
    //           <Home />
    //         </Tab.Pane>
    //       </Tab.Content>
    //       <Tab.Content>
    //         <Tab.Pane eventKey={'setup'}>
    //           <Setup />
    //         </Tab.Pane>
    //       </Tab.Content>
    //     </Tab.Container>
    //   </div>
    //   {/* <div className="footer">
    //     <Footer />
    //   </div> */}
    // </>
  );
};

export default Navigation;
