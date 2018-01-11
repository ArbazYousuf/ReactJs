import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper';
import loginMiddleWare from '../../Store/Middleware/middleware';
import {connect} from 'react-redux';

const style = {
    paddingBotton: 30,
    width: '40%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    paddingBottom: 36,
    marginTop: 10,
    opacity: 0.8,

};

function mapStatToProps(state){
    return{
        name : state.Auth.displayName
    }
}
function mapDispatchToProps(dispatch){
    return{
        login : function (state){
            return dispatch(loginMiddleWare.Login(state))
        }
    }
}

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }
    checkData() {
      this.props.login(this.state)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.name){
            this.props.history.push('/home')
        }
    }
    render() {
        return (
            <div>
                <div className="Align1">
                    <Paper style={style} zDepth={5} rounded={false} >
                        <h1 className="loginh1">Login</h1>
                        <div className="login-border1">
                            <TextField
                                hintText="contactme797@gmail.com"
                                floatingLabelText="Email Address"
                                value={this.state.email}
                                onChange={(ev) => { this.setState({ email: ev.target.value }) }}
                            /> <br />
                            <TextField
                                hintText="hello1234"
                                floatingLabelText="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(ev) => { this.setState({ password: ev.target.value }) }}
                            />
                            <br /><br />
                            <RaisedButton
                                label="LogIn"
                                labelPosition="before"
                                primary={true}
                                className="button"
                                align="center"
                                type="submit"
                                onClick={this.checkData.bind(this)}
                            />
                            <br /><br />
                            <div className="newAcc">Create a New Account:<Link to='/Signup'><span className="newSign"> Signup</span> </Link></div>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}
export default connect(mapStatToProps,mapDispatchToProps)(Login);