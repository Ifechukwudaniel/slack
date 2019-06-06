import  * as actionsType from '../actions/types'
import {combineReducers} from 'redux'

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


const rootReducer = combineReducers({
  user: user_reducer
})

export default rootReducer