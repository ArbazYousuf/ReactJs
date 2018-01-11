import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router-dom';
import * as firebase from 'firebase'
export default class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentuserName:'',
            condition: false,
        };
      }
    
      handleToggle = () => this.setState({open: !this.state.open});
    
      handleClose = () => this.setState({open: false});

    render(){
        return(
            <div>
                <AppBar
                    title="Campus Recruitment System"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={()=>{
                      var user = firebase.auth().currentUser
                      if(user){
firebase.database().ref(`Users/${user.uid}`).on("value", (snapshot) => {
  let data = snapshot.val();
  this.setState({
    currentuserName : data.name,
    condition: true
  })

})
}
this.setState({open: !this.state.open})
                    }}
                />
                <div>
              {this.state.condition?<div>
              
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.handleClose}>{this.state.currentuserName}</MenuItem>
          <br />
          <Link to="/"><MenuItem onClick={()=>{firebase.auth().signOut();
          this.setState({condition: false})}}>SignOut</MenuItem></Link>
        </Drawer></div>: <div></div>}
      </div>
            </div>
        )
    }
    
}