import React, { Component } from 'react';
import {Menu } from 'semantic-ui-react'
import UserPanel from "./UserPanel"

 class SidePanel extends Component {
  render() {
    const { currentUser} = this.props
    return (
        <Menu size="large" fixed="left" vertical style = {{backgroundColor: '#4c3c4c'}}>
          <UserPanel currentUser={currentUser}/>
        </Menu>
      
    );
  }
}

export default SidePanel