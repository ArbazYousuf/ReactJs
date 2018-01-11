import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import * as firebase from 'firebase'
import Signup from './Components/SignUp/signup.js'
import Home from './Components/Home/home.js'
import Login from './Components/Login/login'
import Recipient from './Components/Recipient/recipient'


const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Home" component={Home} />
      <Route path="/Recipient" component={Recipient} />
    </div>
  </Router>
)
export class App extends Component {
  render(){
    return(
      <div>
        <Login />
      </div>
    )
  }
}

export default Root;
