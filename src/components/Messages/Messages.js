import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

import firebase from '../../firebase'
import Message from './Message'

class Messages extends React.Component {
  state={
    messageRef : firebase.database().ref('messages'),
    messages: [],
    messagesLoading : true,
    channel : this.props.currentChannel,
    user : this.props.currentUser
  }

  componentDidMount(){
    const { messageRef,user , channel} = this.state

    if(channel) {
      this.addListener(channel.id)
    }
  }
  addListener= channelId =>{
     this.addMessageListener(channelId)
  }
  addMessageListener = channelId =>{
    let loadedMessage = []
    this.state.messageRef.child(channelId).on('child_added', snap=>{
       loadedMessage.push(snap.val())
       this.setState({messages: loadedMessage, messagesLoading: false})
    })
  }
 
  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  render() {
    const {messages,messageRef,channel,user}  = this.state
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">
          {/* Messages */}
           {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
         key ={'MessageForm'}
         messageRef= {messageRef}
          currentChannel={channel} 
          currentUser={user} />
      </React.Fragment>
    );
  }
}

export default Messages;
