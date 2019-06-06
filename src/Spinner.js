import React, { Component } from 'react'
import { Dimmer, Loader} from 'semantic-ui-react'

 class Spinner extends Component {
  render() {
    return (
        <Dimmer active>
            <Loader size="huge" text="Loading info ....." />
        </Dimmer>
    )
  }
}

export default  Spinner