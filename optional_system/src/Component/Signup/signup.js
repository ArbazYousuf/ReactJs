import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import loginMiddleWare from '../../Store/Middleware/middleware'

function mapStateToPorps(state) {
    return {
        name: state.displayName,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        signup: function (state) {
            return dispatch(loginMiddleWare.Signup(state))
        }

    }
}
class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            image: null,
        }
    }
    sendData() {
        console.log('1')
        this.props.signup(this.state)
    }

    componentWillReceiveProps(nextProps){
        this.props.history.push('/home')
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
                                <input
                                    accept="image/*"
                                    onChange={(e)=>{this.setState({image : e.target.files[0]})}}
                                    id="raised-button-file"
                                    type="file"
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

export default connect(mapStateToPorps, mapDispatchToProps)(Signup);