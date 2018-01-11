import React, {Component} from 'react';
import Sigup from '../SignUp/signup';
import img from '../../images/logo/logo1.jpg'
import * as firebase from 'firebase'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom'

class Login extends Component {
    ref = firebase.database().ref();
    constructor(props){
      super(props)
      this.state={
        email: 'arbaz@gmail.com',
        pas: 'hello1234'
      }
    }
   
    checkData(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pas)
   .then((user)=>{
     alert('logged in')
     localStorage.setItem('currentuser', user.uid )
     this.props.history.push('../Home')
   }) 
   .catch((ev)=>{
    alert('not loggind')
   })
  }
  
    render() {
      return (
        <div className="App">
            <img src={img} alt="Blood Bank Logo" /><br/>
          <div className="login-border1">
            <TextField
        hintText="contactme797@gmail.com"
        floatingLabelText="Email Address"
        value={this.state.email}
        onChange={(a)=>{this.setState({email: a.target.value})}}
       
      /> <br /><div id='email' className="div2"></div>
      <TextField
        hintText="hello1234"
        floatingLabelText="Password"
        type="password"
        value={this.state.pas}
        onChange={(a)=>{this.setState({pas: a.target.value})}}
      /><br /><div id="password" className="div2"></div>
        <Link to='/Signup' className="createaccount">
        Create a new Account
        </Link><br /><br />
      <RaisedButton
        label="SUBMIT"
        labelPosition="before"
        primary={true}
        className="button"
        onClick={this.checkData.bind(this)} 
      />
          </div>
        </div>
      );
    }
  }
  
  export default Login;
  