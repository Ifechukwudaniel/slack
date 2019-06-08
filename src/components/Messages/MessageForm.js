import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from '../../firebase'

class MessageForm extends React.Component {
  state = {
    message : "",
    isLoading : false,
    channel : this.props.currentChannel,
    user : this.props.currentUser,
    errors : []
  }
  handleonChange = event => {
    this.setState({[event.target.name] : event.target.value})
  }
  createMessage = ()=>{
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
       user: {
          id: this.state.user.uid,
          name: this.state.user.displayName,
          avatar : this.state.user.photoURL
       },
      content: this.state.message
    }
    return message
  }
   
  sendMessage = ()=>{
    const {messageRef} = this.props
    const {message, channel, errors} = this.state

    if (message) {
        this.setState({isLoading: true})
        messageRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then( ()=>{
           this.setState({isLoading: false, message: '', errors:[]})
           console.log("added mmessage")
        })
        .catch(err=>{
          this.setState({ errors : errors.concat({message: err.message}) })
          console.log( err)
        })
      
    }
    else
    this.setState({errors : errors.concat({ message: "add a message"})})
          
  }
  render() {
    const {message, isLoading,  errors} = this.state
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          value={message}
          className= {errors.some(error =>  error.message.includes("message")) ?"error" :''}
          placeholder="Write your message"
          onChange = {this.handleonChange}
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            onClick={this.sendMessage}
            disabled={isLoading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
