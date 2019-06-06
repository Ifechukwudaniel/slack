import React, { Component } from 'react'
import {Grid, Header, Icon, Dropdown} from 'semantic-ui-react'
import firebase from '../../firebase'

 class UserPanel extends Component {
   state={
     currentUser: this.props.currentUser
   }
   dropdownOptions =()=>[
    {
        key:"users",
        text:<span> Signed as <strong>{ this.state.currentUser.displayName} </strong> </span>,
        disabled: true
    },
    {
        key:"avater",
        text:<span> Change Avater </span>,
    },
    {
        key:"signout",
        text:<span onClick={ this.handleSignOut} > Sign Out </span>
    }
    ]
    handleSignOut =()=>{
      firebase
       .auth()
       .signOut().then( 
           console.log("signed out")
       )
   }

  render() {
    return (
     <Grid  style={{backgroundColor:  '#4c3c4c',}}>
       <Grid.Column>
           <Grid.Row style={{ padding: '1.2em', margin: '0', }} >
             {/* Application Header */}
             <Header as="h2" inverted floated ="left">
                  <Icon  name="code"/>
                 <Header.Content >Dev Chat </Header.Content>
             </Header>
           </Grid.Row>
             {/* drop down section */}
             <Header style={{padding: 'o.25em'}} as='h4' inverted> 
              <Dropdown trigger= {<span> { this.state.currentUser.displayName} </span> } options={this.dropdownOptions()}/> 
              </Header>

       </Grid.Column>
     </Grid>
    )
  }
}



export default UserPanel