import React, { Component } from 'react';
import '../../App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import img from '../../images/logo/logo1.jpg'
import * as firebase from 'firebase';
import Home from '../Home/home'
// import {Link} from 'react-router-dom'

class Signup extends Component {
  ref = firebase.database().ref();
  constructor(props){
    super(props)
    this.state={
      name : '',
      fathername : '',
      email : '',
      password : '',

    }
  }
     ClearState(){
        this.setState({name:''})
        this.setState({fathername:''})
        this.setState({email:''})
        this.setState({password:''})
      }
          sendToFirebase(ev){
            ev.preventDefault();   
         firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then((user) => { console.log(user)
                firebase.auth().currentUser.updateProfile({
                    displayName:this.state.name
                    
                })
    
                   
                    
    
                    let uids = firebase.auth().currentUser.uid;
                    console.log("email "+this.state.email)
                        firebase.database().ref("SignupData/"+uids).set({
                        username:this.state.name,
                        fathername: this.state.fathername,
                        email:this.state.email,
                        password:this.state.password,
                        key: uids
                    })
                    firebase.database().ref('SignupData/'+firebase.auth().currentUser.uid).on('value',(snap)=>{
                           console.log(snap.val().email)})
                    this.ClearState.bind(this)
                    alert("Sign up Done");

                  
                      this.props.history.push("/Home")
            })
          }

  changeHandler(name, ev){
     this.setState({[name] : ev.target.value})

     console.log(this.state.email)
  

  }

  render() {
    return (
      <div className="App">
          <img src={img} alt="Blod Bank Logo" /><br/>
        <div className="login-border1">
          <TextField
      hintText="Arbaz Yousuf"
      floatingLabelText="Your Name"
      onChange={this.changeHandler.bind(this,'name')}
    /> <br />
    <TextField
      hintText="Muhammad Yousuf"
      floatingLabelText="Father Name"
      onChange={this.changeHandler.bind(this,'fathername')}
    /><br />
    <TextField
      hintText="contactme797@gmail.com"
      floatingLabelText="Email Address"
      onChange={this.changeHandler.bind(this,'email')}
    /><br />
    <TextField
      hintText="hello1234"
      floatingLabelText="Password"
      type="password"
      onChange={this.changeHandler.bind(this,'password')}
    /><br /><br/>
    <RaisedButton
      label="Sign Up"
      labelPosition="before"
      primary={true}
      className="button"
      onClick={this.sendToFirebase.bind(this)}
    />
        </div>
      </div>
    );
  }
}

export default Signup;
