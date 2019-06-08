import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

import firebase from '../../firebase'

class Messages extends React.Component {
  state={
    messageRef : firebase.database().ref('messages'),
    channel : this.props.currentChannel,
    user : this.props.currentUser
  }
  render() {
    return (
      <React.Fragment>
        <MessagesHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm
        key ={'ncecejeduduuee'}
         messageRef= {this.state.messageRef}
          currentChannel={this.state.channel} 
          currentUser={ this.state.user} />
      </React.Fragment>
    );
  }
}

export default Messages;
