import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from '../../firebase'
import FileModal from "./FileModal";
import uuidv4 from 'uuid/v4'

class MessageForm extends React.Component {
  state = {
    storageRef: firebase.storage().ref(),
    uploadTask: null,
    percentUploaded: 0,
    uploadState : '',
    message : "",
    isLoading : false,
    channel : this.props.currentChannel,
    user : this.props.currentUser,
    errors : [],
    modal: false
  }

   openModal = ()=> this.setState({ modal: true})

   closeModal = ()=> this.setState({ modal: false})
  
  handleonChange = event => {
    this.setState({[event.target.name] : event.target.value})
  }
  createMessage = (fileUrl=null)=>{
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
       user: {
          id: this.state.user.uid,
          name: this.state.user.displayName,
          avatar : this.state.user.photoURL
       }
    }
    if(fileUrl!== null)
     message['image'] = fileUrl
    else
      message['content'] = this.state.message

    return message
  }

  uploadFile=(file, metadata)=>{
    const pathToUpload = this.state.channel.id
    const ref = this.props.messageRef;
    const filePath = `chat/public/${uuidv4()}.jpg`
  
    this.setState({
      uploadState:"uploading",
      uploadTask: this.state.storageRef.child(filePath).put(file,metadata)
    },
    ()=>{
      this.state.uploadTask.on("state_changed",snap=>{
       const percentUploaded = Math.round((snap.bytesTransferred /snap.totalBytes) * 100)
       this.setState({percentUploaded})
      },
       err=>{
         console.log(err)
          this.setState({
              errors: this.state.errors.concat(err),
              uploadState: 'error',
              uploadTask: null
          })
       }
       ,
       ()=>{
         this.state.uploadTask.snapshot.ref
         .getDownloadURL()
         .then( downloadUrl =>{
           this.sendFileMessage( downloadUrl, ref,pathToUpload)
         })
         .catch( err =>{
            console.log(err)
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState : 'error',
               uploadTask: null
            })
         })
       }
      )
    })
  }
   
  sendFileMessage= ( fileUrl , ref, pathToUpload) =>{
      ref
      .child(pathToUpload)
      .push()
      .set( this.createMessage(fileUrl))
      .then(()=>{
        this.setState({ uploadState: "done"})
      })
      .catch( err =>{
        console.log( err)
        this.setState({ 
          errors : this.state.errors.concat(err)
        })
      })
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
    this.setState({errors : errors.concat({ message: "Add a message"})})
          
  }

  render() {
    const {message, isLoading,  errors, modal} = this.state
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
            onClick={()=>this.openModal()}
          />
        </Button.Group>
        <FileModal uploadFile={this.uploadFile} modal = {modal} closeModal={this.closeModal}/>
      </Segment>
    );
  }
}

export default MessageForm;
