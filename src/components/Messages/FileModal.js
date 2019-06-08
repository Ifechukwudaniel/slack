import React, { Component } from 'react'
import {Modal, Input, Button, Icon} from 'semantic-ui-react'
import mime from 'mime-types'

 class FileModal extends Component {
  state={
    file: null,
    autorized:['image/png', 'image/jpeg', 'image/jpg']
  }
 

  addFile= event => {
    const file  = event.target.files[0]
    this.setState({file})
  }

  sendFile = ()=>{
    const { file} = this.state
    const {closeModal, uploadFile} = this.props
    
    if (file!==null) {
      if (this.isAuthorized(file.name)) {
          const metadata = {contentType: mime.lookup(file.name)}
          uploadFile(file, metadata) 
          closeModal() 
          this.clearFile()
      } 
    }
  }

clearFile=()=> this.setState({file: null})

isAuthorized = fileName => this.state.autorized.includes(mime.lookup(fileName))

  render() {

    const { modal, closeModal} = this.props
  
    return (
     <Modal basic open={modal} >
        <Modal.Header> Add a Image </Modal.Header>
        <Modal.Content>
          <Input
           fluid onChange={this.addFile} label="FileTypes .jpg .png" name='file' type='file' labelPosition="left"
          />
        </Modal.Content>
        <Modal.Actions>
        <Button onClick= { this.sendFile} inverted color="green" >
           <Icon name='check'/>
            Upload
        </Button>
        <Button inverted color="red" onClick={closeModal} >
           <Icon name='cancel'/>
            Cancel
        </Button>
        </Modal.Actions>
     </Modal>
    )
  }
}

export default FileModal