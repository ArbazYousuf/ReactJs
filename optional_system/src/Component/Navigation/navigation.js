import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase'
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux'



function mapStateToProps(state){
    return{
            name : state.Auth.displayName,
            img : state.Auth.photoURL,
            uid : state.Auth.uid,
            }
}
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentuserName: '',
            condition: false,
           
        };
    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });
    CurrentUser() {
        var user = firebase.auth().currentUser
        if (user) {
            firebase.database().ref(`Users/${firebase.auth().currentUser.uid}`).on("value", (snapshot) => {
                let data = snapshot.val();
                this.setState({
                    condition: true
                })

            })
        }
        this.setState({ open: !this.state.open })
    }
    render() {
        return (
            <div>
                <AppBar
                    title="Optional System"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.CurrentUser.bind(this)}
                />
                <div>
                    {this.state.condition ? <div>

                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({ open })}
                        >
                            <Avatar
                                alt="Adelle Charles"
                                id='myimg'
                                src={this.props.img}
                                style={{width: 100,height:100}}
                            />
                            <MenuItem onClick={this.handleClose}>{this.props.name}</MenuItem>
                            <hr />
                            <Link to="/home"> <MenuItem>Home</MenuItem> </Link>
                            <Link to="/mypost"> <MenuItem>My Post</MenuItem> </Link>
                            <Link to={"/details/"+this.props.uid}> <MenuItem>Your Purchase</MenuItem> </Link>
                            <Link to="/"><MenuItem onClick={() => {
                                firebase.auth().signOut();
                                this.setState({ condition: false })
                                
                            }}>SignOut</MenuItem></Link>
                        </Drawer></div> : <div></div>}
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps)(Navigation)