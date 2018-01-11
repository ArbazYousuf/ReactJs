import React,{Component} from 'react'
import { Navbar,
        NavItem,
        NavDropdown,
        MenuItem,
        Nav } from 'react-bootstrap';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom'

export default class Navigation extends Component{
    ref= firebase.database().ref();
    constructor(){
      super()
      this.state={
        currentusername:''
      }
    }
    componentDidMount(){
      var comment = localStorage.getItem('currentuser')
      this.ref.child('SignupData/'+comment).on('value', (snapshot) => {
        let data = snapshot.val();
        if(data){
        this.setState({currentusername: data.username})
        }else(null)
      })
    }
    render(){
        return(
        <div >
                <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Blood Bank</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="#">Donate</NavItem>
      <NavItem eventKey={2} href="#"><Link to="/Recipient">Recipient</Link></NavItem>
      <NavItem className="rightNav" eventKey={3} href="#">{this.state.currentusername}</NavItem>
      <NavItem  eventKey={4} onClick={()=>{firebase.auth().signOut(),this.props.history.push("/")}}>LogOut</NavItem>
    </Nav>
  </Navbar>        
            </div>
        )
    }
}