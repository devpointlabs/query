import React from 'react';
// import { AuthConsumer, } from '../providers/AuthProvider';
import { Menu, } from 'semantic-ui-react';
import { Link, } from 'react-router-dom';

const Navbar = () => (
  <Menu>
    <Link to="/">
      <Menu.Item>
        Home
      </Menu.Item>
    </Link>
    <Link to="/login">
      <Menu.Item>
        Login
      </Menu.Item>
    </Link>
    <Link to="/register">
      <Menu.Item>
        Register
      </Menu.Item>
    </Link>
  </Menu>
)
export default Navbar;