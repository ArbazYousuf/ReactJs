import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login/login'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import SignUp from './Components/SignUp/signup';
import Home from './Components/Home/home';


const Root = () => (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/Signup" component={SignUp} />
        <Route path="/Home" component={Home} />
      </div>
    </Router>
  )

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default Root;
