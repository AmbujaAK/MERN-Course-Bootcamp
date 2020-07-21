import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {UserContext} from '../user-context';

const TopNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logoutHandler = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
//    history.push('/login')
    setIsLoggedIn(false)
  }

//   <ButtonGroup>
//   <Button color='secondary' onClick={() => history.push('events')}>Events</Button>
//   <Button color='danger' onClick={logoutHandler}>Logout</Button>
// </ButtonGroup>


return isLoggedIn ?
    <div>
      {console.log(isLoggedIn)}
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} />
        <Link to="/login" onClick={logoutHandler}>Logout</Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/events">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Dashboards</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  : ""
}

export default TopNav;