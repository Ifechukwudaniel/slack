import React, { Component } from 'react'
import {Grid, Icon, Message, Form, Button, Header, Segment} from "semantic-ui-react" 
import {Link} from 'react-router-dom'

class Register extends Component {
 handleOnChange=()=>{

    }
  render() {
    return (
        <Grid textAlign='center'verticalAlign='middle' className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
             <Icon  color="orange" name="puzzle piece" size="massive" />
                <Header as='h2' color='orange' textAlign='center'>
                      Register For developers
                </Header>
                <Form size='large'>
                    <Segment stacked>

                    <Form.Input
                     name="Username" onChange={this.handleOnChange} 
                     fluid icon='user' iconPosition='left'
                     placeholder='Username' type="text" />

                     
                    <Form.Input
                     name="Email" onChange={this.handleOnChange} 
                     fluid icon='mail' iconPosition='left' 
                     placeholder='E-mail address'  type="text" />

                     <Form.Input
                     name="Password" onChange={this.handleOnChange} 
                     fluid icon='lock' iconPosition='left'
                     placeholder='Password'   type='password'  />

                     <Form.Input
                     name="ConfirmPassword"   onChange={this.handleOnChange} 
                     fluid icon="repeat" iconPosition='left'
                     placeholder='Confirm Password'   type='password'  />

                    <Button color="orange" fluid size='large'>Login</Button>
                    </Segment>
                 </Form>

          <Message>
            Alerady a user ? <Link to="/login">Login </Link>  
          </Message>
          
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
