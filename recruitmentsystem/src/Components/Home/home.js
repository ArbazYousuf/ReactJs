import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MyPost from '../Company/MyPost/mypost';
import AddPost from '../Company/AddPost/addpost';
import AllStudent from '../Company/AllStudent/student';
import AllJob from '../Student/AllJobs/alljobs';
import AllCompany from '../Student/AllCompany/allcompany';
import UpdateInf from '../Student/UpdateInf/updateinf';

import * as firebase from 'firebase'
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 1,
          accType: "",
          admin: false
        };
      }
      componentDidMount(){
        var uid = localStorage.getItem('uid')
        this.setState({accType:""})
        firebase.database().ref(`Users/${uid}`).on('value',(snap)=>{
            let data = snap.val()
               if(data.accType === "Student"){
                this.setState({accType: "Student"})
            }
            if(data.accType === "Company"){
              this.setState({accType: "Company"})
            }
            if(data.accType === "Admin"){
              this.setState({accType : "Admin",admin:true})
            }
        })
    }
      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      }
    render(){
        return(
            <div>
            <div>
        {this.state.admin? 
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          
          <Tab label='All Jobs' value={0} />
          <Tab label="All Company" value={1} />
          <Tab label="All Student" value={2} /> 
          </Tabs>
          :
          <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label={this.state.accType === "Student"? 'UpdateInf' : 'Add Jobs' } value={0} />
          <Tab label={this.state.accType === "Student"? 'All Jobs' : 'My Jobs' } value={1} />
          <Tab label={this.state.accType === "Student"? 'All Company' : 'All Student' } value={2} />
          </Tabs>
          }
        {this.state.admin?
        <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange}
      >
        <div>
         <AllJob admin={this.state.admin} />}
        </div>
        <div style={styles.slide}>
        <AllCompany admin={this.state.admin} />
        </div>
        <div style={styles.slide}>
         <AllStudent admin={this.state.admin} />
        </div>
      </SwipeableViews>
      :
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            { this.state.accType === 'Student'?<UpdateInf admin={this.state.admin} />:<AddPost admin={this.state.admin}/>}
          </div>
          <div style={styles.slide}>
           { this.state.accType === 'Student'? <AllJob admin={this.state.admin}/> : <MyPost admin={this.state.admin}/> }
          </div>
          <div style={styles.slide}>
            {this.state.accType === 'Student'?<AllCompany admin={this.state.admin}/>:<AllStudent admin={this.state.admin}/>}
          </div>
        </SwipeableViews>}
      </div>
            </div>
        )
    }
}