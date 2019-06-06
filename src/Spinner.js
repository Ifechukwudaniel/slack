import React, { Component } from 'react'
import { Dimmer, Loader} from 'semantic-ui-react'

 class Spinner extends Component {
  render() {
    return (
        <Dimmer active>
             <Loader size="massive">Loading ....... </Loader>
        </Dimmer>
    )
  }
}

export default  Spinner