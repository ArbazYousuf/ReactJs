import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom'
export default class Signup extends Component {
    ref = firebase.database().ref();
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',

        }
    }
    sendData() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: this.state.name
                })
                let uids = firebase.auth().currentUser.uid;
                firebase.database().ref(`Users/${uids}`).set({
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                    AccType: 'Student',
                    key: uids,
                })
                localStorage.setItem('uid', firebase.auth().currentUser.uid)
                this.setState({ name: '', email: '', password: '' })

                this.props.history.push("/home")
            })
            .catch(ev => { console.log(ev) })

    }

    render() {
        return (
            <div className="Align1">
                <div className="tabStyle">
                    <Paper className="paperStyle" zDepth={5} rounded={false} >
                        <div className='signupStyle'>
                            <h1 className="loginh1">Student Signup</h1>
                            <div className="login-border1">
                                <TextField
                                    hintText="Arbaz Yousuf"
                                    floatingLabelText="Full Name"
                                    onChange={(ev) => { this.setState({ name: ev.target.value }) }}
                                /> <br />
                                <TextField
                                    hintText="contactme797@gmail.com"
                                    floatingLabelText="Email Address"
                                    onChange={(ev) => { this.setState({ email: ev.target.value }) }}
                                /><br />
                                <TextField
                                    hintText="hello1234"
                                    floatingLabelText="Password"
                                    type="password"
                                    onChange={(ev) => { this.setState({ password: ev.target.value }) }}
                                />
                                <br />
                                <br />
                                <RaisedButton
                                    label="Sign Up"
                                    labelPosition="before"
                                    primary={true}
                                    className="button"
                                    onClick={this.sendData.bind(this)}
                                />
<br /><br />
                            <div className="newAcc"><Link to='/'><span className="newSign">Already Have a Account</span> </Link></div>
                            </div>
                        </div>
                    </Paper>
                </div>

            </div>

        )
    }
}