import  * as actionsType from '../actions/types'
import {combineReducers} from 'redux'


  // user reducer
 const intialUserState ={
      currentUser: null,
      isLoading : true
 }

const user_reducer = (state = intialUserState, action) => {
  switch (action.type) {
    case actionsType.SET_USER:
      return  {
        currentUser: action.payload.currentUser,
        isLoading : false
      }
    case actionsType.CLEAR_USER:
     return {
       ...intialUserState,
      isLoading : false 
     }
    default:
      return state
  }
}

// channel reducer
const intialChannelState = {
   currentUser: null
}

export const channel_reducer = (state = intialChannelState , action) => {
  switch (action.type) {
    case actionsType.SET_CURRENT_CHANNEL:
      return  {
        currentChannel : action.payload.currentChannel
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
})

export default rootReducer