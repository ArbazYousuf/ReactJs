import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import Navigation from './Components/Navigation/navigation'
import Home from './Components/Home/home'
import Booking from './Components/Home/Booking/booking';
import AreaBooking from './Components/AreaBooking/areabooking';
import img from '../src/image/bg.jpg'

class App extends Component {
  render() {
    return (
      <div className="bgimg">
        <div>
          <Router>
            <div className="navigation" >
              <Navigation />
              <Route exact path="/" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/area/:key" component={Booking} />
              <Route path="/areabooking/:key" component={AreaBooking} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
