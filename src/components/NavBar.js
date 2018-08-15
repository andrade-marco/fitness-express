//Navigation bar
import React from 'react';
import {Menu, Button} from 'semantic-ui-react';

//Component
const NavBar = ({signOut}) => {
  return (
    <Menu borderless className='navbar'>
      <Menu.Item className='nav-logo-container'>
        <img src='/images/FE_logo.svg' alt='logo'/>
      </Menu.Item>
      <Menu.Item position='right'>
        <Button onClick={signOut}>Sign out</Button>
      </Menu.Item>
    </Menu>
  );
}

//Export
export default NavBar;
