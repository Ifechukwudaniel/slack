import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,Route , Switch, withRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import firebase  from './firebase'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

const store =createStore(()=>{}, composeWithDevTools())

class  Root extends React.Component {
    componentDidMount (){
      firebase.auth().onAuthStateChanged(user=>{
         if( user){
             this.props.history.push('/')
         }
      })
    }
    render(){
        return(
                <Switch>
                    <Route  exact path="/" component ={App}/>
                    <Route  path="/login" component ={Login}/>
                    <Route  path="/register" component ={Register}/>
                </Switch>
        )
    }
}

 const RootwithAuth = withRouter(Root)


ReactDOM.render(
   <Provider store={store}>
    <Router>
        <RootwithAuth/>
    </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
