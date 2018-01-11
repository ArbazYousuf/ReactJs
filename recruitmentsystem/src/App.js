import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import Navigation from './Components/Navigation/navigation'
import Home from './Components/Home/home'



export class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: '#9975B9', width:'100%' , height:'100%'}}>
  <div>
       <Router>
      <div className="navigation" >
       <Navigation />
    <Route exact path="/" component={Login} />
    <Route path="/Signup" component={Signup} />
    <Route path="/home" component={Home} />
  </div>
</Router>
      </div>
    </div>
    );
  }
}

export default App;
