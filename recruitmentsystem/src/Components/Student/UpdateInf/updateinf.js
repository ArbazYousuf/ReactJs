import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

export default class UpdateInf extends Component{
        constructor(){
            super()
            this.state={
                Skills : '',
                Education : '',
                Experience:'',
               
            }
        }
        componentDidMount(){
            let uid = localStorage.getItem('uid')
            firebase.database().ref(`Users/${uid}`).on('value', (snap)=>{
                let data = snap.val();
                this.setState({Skills :data.Skills,
                               Education: data.Education,
                               Experience: data.Experience
        })
            }
                
            )
            
        }
        CompanyReg(){
            let uid = localStorage.getItem('uid')
            if(this.state.Skills ==='' || this.state.Education === ''||
        this.state.Experience === ''){
        alert('Insert Input Field Completly')
    }else{
            firebase.database().ref(`Users/${uid}`).update({
                Skills: this.state.Skills,
                Education: this.state.Education,
                Experience: this.state.Experience,
            })
         alert("Updated")
        }
    }
    handleChange = (event, index, value) => this.setState({Education : value});
    render(){
        return(
            <div >
                <div className="regPaper">
               <Paper className="appaper" zDepth={5} rounded={false} >
               <div  className="jobReg">
                   <h1>Personal Information</h1>
                   <TextField
      hintText="Skills"
      multiLine={true}
      rows={2}
      rowsMax={4}
      value={this.state.Skills}
      onChange={(e)=>{
          this.setState({Skills: e.target.value})}}
    /><br />
    <br />  <TextField
      hintText="Experience"
      value={this.state.Experience}
      onChange={(e)=>{
          this.setState({Experience: e.target.value})
      }}
    /><br />      <SelectField
          floatingLabelText="Education"
          value={this.state.Education}
          onChange={this.handleChange}
        >
          <MenuItem value='Matric' primaryText="Matric" />
          <MenuItem value='Intermediate' primaryText="Intermediate" />
          <MenuItem value='Bachelar' primaryText="Bachelar" />
          <MenuItem value='Master' primaryText="Master" />
          
        </SelectField>
        <br />  <br />
        <RaisedButton label="Submit" secondary={true} onClick={this.CompanyReg.bind(this)} />

              
               </div>
               </Paper>
               </div>
            </div>
        )
    }
}