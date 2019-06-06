import React, { Component } from 'react';
import {Menu } from 'semantic-ui-react'
import UserPanel from "./UersPanel"

 class SidePanel extends Component {
  render() {
    return (
        <Menu size="large" fixed="left" vertical style = {{backgroundColor: '#4c3c4c'}}>
          <UserPanel/>
        </Menu>
      
    );
  }
}

export default SidePanel