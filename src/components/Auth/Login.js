import React, { Component } from 'react'
import {Grid, Icon, Message, Form, Button, Header, Segment} from "semantic-ui-react" 
import firebase from '../../firebase'
import {Link} from 'react-router-dom'

class Login extends Component {
  state= {
      email:'',
      password:'',
      errors:[],
      loading : false,
  }


 handleonChange= event=>{
    this.setState({[event.target.name]: event.target.value})
    this.setState({ errors: []})
    this.setState({loading : false })
 }

 handleonSubmit =event=>{
    const   {email,password,errors} = this.state
    this.setState({loading : true })
    event.preventDefault()
    this.setState({ errors: []})
     if(this.isFormvalid(this.state)){
     firebase
     .auth()
     .signInWithEmailAndPassword(email,password).then( SignedinUser=>{
          console.log( SignedinUser)
     }
      
     ).catch(error=>{
        if (error.message=== "There is no user record corresponding to this identifier. The user may have been deleted.") {
            error.message = "There is no  user with this email"
           }
         this.setState({errors: errors.concat({ message :error.message})})
         this.setState({loading : false })
     })
     }
 }

 isFormvalid = (email, password)  => ((email.length && password.length) !== 0)

 
 errorMsg = ({message},i)=>{ 
  return <h3 key={i}>{message}</h3> 
 }
showerror = ( errors,name) =>errors.some(error =>  error.message.toLowerCase().includes(name)) ?"error" :'';
 
  render() {

  const   {errors, loading} = this.state
    return (
        <Grid textAlign='center'verticalAlign='middle' className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
             <Icon  color="green" name="laptop" size="massive" />
                <Header as='h1' color='green' textAlign='center'>
                      Login  For developers
                </Header>
                <Form onSubmit={this.handleonSubmit} size='large'>
                    <Segment stacked>


                     
                    <Form.Input
                     name="email" onChange={this.handleonChange} 
                     fluid icon='mail'
                      className={this.showerror(errors,"email") }
                     iconPosition='left' 
                     placeholder='E-mail address'  type="email" />

                     <Form.Input
                     name="password" onChange={this.handleonChange} 
                     fluid icon='lock' iconPosition='left'
                     className={this.showerror(errors,"password") }
                     placeholder='Password'   type='password'  />

                    <Button disabled={loading} className={loading ?"loading" :''} type="submit" color="green" fluid size='large'>Login</Button>
                    </Segment>

                 </Form>
                 { errors.length !== 0 &&(
                         <Message error >
                                {errors.map((error, i)=> this.errorMsg(error,i))}
                         </Message>
                     ) }
          <Message>
              Register here ? <Link to="/register">Register </Link>  
          </Message>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Login
