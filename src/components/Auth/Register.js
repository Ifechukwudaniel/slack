import React, { Component } from 'react'
import {Grid, Icon, Message, Form, Button, Header, Segment} from "semantic-ui-react" 
import firebase from '../../firebase'
import {Link} from 'react-router-dom'
import md5 from 'md5'

class Register extends Component {
  state= {
      username:'',
      email:'',
      password:'',
      passwordConfirmation:'',
      errors:[],
      loading : false,
      userRefs: firebase.database().ref("users")
  }


 handleonChange= event=>{
    this.setState({[event.target.name]: event.target.value})
    this.setState({ errors: []})
    this.setState({loading : false })
 }

 handleonSubmit =event=>{
    const   {username,errors} = this.state
    event.preventDefault()
    this.setState({loading : true })
     if(this.isFormvalid()){
     this.setState({loading : true })
     firebase
     .auth()
     .createUserWithEmailAndPassword( this.state.email, this.state.password)
     .then((createdUser)=>{
         createdUser.user.updateProfile({
             displayName: username,
             photoURL : `https://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
         }).then(()=>{
          this.setState({ errors: []})
          this.saveUser(createdUser).then(() => {
            console.log("user saved");
          });
         }).catch((error)=>{
            console.log(error)
            this.setState({ errors: errors.concat({message:error.message}),loading : false  })
         })
     })
     .catch((error) =>{
         console.log(error)
         this.setState({ errors: errors.concat({message:error.message}),loading : false  })
     })
    }

 }

 saveUser= createdUser =>{
     return this.state.userRefs.child(createdUser.user.uid).set({
         name: createdUser.user.displayName,
         avatar: createdUser.user.photoURL
     })
 }

 isFormvalid = () =>{
     const { errors} = this.state
     let error ;
     if (this.isEmpty(this.state)) {
         error= "Please fill in all fileds"
         this.setState({errors: errors.concat({message:error})})
      return false
     }
     if (!this.isPasswordValid(this.state)) { error= "Invalid password"
       this.setState({errors: errors.concat({message:error})})  
        return false
     }
     else
     return true;

 }

 isEmpty=({ username,email, password,passwordConfirmation})=>{
     return username.length ===0|| email.length===0||password.length===0|| passwordConfirmation.length===0
 }
 isPasswordValid = ({ password,passwordConfirmation})=>{
   return   ((password.length < 6 || passwordConfirmation.length < 6 ) || ((password !== passwordConfirmation)) ) ?   false  : true 
 }
     
 errorMsg = ({message},i)=>(
   <h3 key={i}>{message}</h3> 
 )
showerror = ( errors,name) =>errors.some(error =>  error.message.toLowerCase().includes(name)) ?"error" :'';
 
  render() {

  const   {errors, loading} = this.state
    return (
        <Grid textAlign='center'verticalAlign='middle' className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
             <Icon  color="orange" name="puzzle piece" size="massive" />
                <Header as='h2' color='orange' textAlign='center'>
                      Register For developers
                </Header>
                <Form onSubmit={this.handleonSubmit} size='large'>
                    <Segment stacked>

                    <Form.Input
                     name='username' onChange={this.handleonChange} 
                     fluid icon='user' iconPosition='left' 
                     placeholder='Username' type="text" />

                     
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

                     <Form.Input
                     name="passwordConfirmation"   onChange={this.handleonChange} 
                     fluid icon="repeat" iconPosition='left'
                     className={this.showerror(errors,"password") }
                     placeholder='Confirm Password'   type='password'  />

                    <Button disabled={loading} className={loading ?"loading" :''} type="submit" color="orange" fluid size='large'>Register</Button>
                    </Segment>

                 </Form>
                 { errors.length !== 0 &&(
                         <Message error >
                                {errors.map((error, i)=> this.errorMsg(error,i))}
                         </Message>
                     ) }
          <Message>
            Click here to ? <Link to="/login">Login</Link>  
          </Message>

        </Grid.Column>
      </Grid>
    )
  }
}

export default Register
