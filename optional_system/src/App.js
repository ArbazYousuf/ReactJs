import React, { Component } from 'react';
import './firebase'
import './App.css';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import Navigation from './Component/Navigation/navigation'
import Home from './Component/Home/home'
import Signup from './Component/Signup/signup'
import Login from './Component/Login/Login'
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import storeAction from './Store/Action/action';
import Post from './Component/Post/post';
import Mypost from './Component/MyPost/mypost'
import loginMiddleWare from './Store/Middleware/middleware';
import Update from './Component/Update/update'
import Detail from './Component/Detail/detail'

function mapStateToProps(state){
  return{
    state : state
  }
}
function mapDispatchToProps(dispatch){
  return {
    sendTo: function (state) {
     return dispatch(storeAction.login(state))
    },
    post: function () {
      return dispatch(loginMiddleWare.getPost())
  }
  }
}

class App extends Component {
  constructor(){
    super()
    this.state={
      send:null
    }
  }
  componentDidMount(){
    console.log(this.props.sendTo)
    var func;
    var post ;
func = this.props.sendTo
post = this.props.post
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
       func(user)
       post()
      }else{
        this.props.history.push('/')
      }
    });
  }
  componentWillReceiveProps(nextProps){
    
    // this.props.history.push('/home')
  }
  render() {
   
    return (
      <div className="imageSet">
   <Router>
     <div className="navigation">
       <Navigation />
       <Route exact path='/' component={Login} />
       <Route path='/signup' component={Signup} />
       <Route path='/home' component={Home} />
       <Route path='/update/:key' component={Update} />
       <Route path='/mypost' component={Mypost} />
       <Route path='/details/:key' component={Detail} />
     </div>
   </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
