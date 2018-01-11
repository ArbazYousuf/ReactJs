import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';

export default class AddPost extends Component{
        constructor(){
            super()
            this.state={
                CompanyName : '',
                Position : '',
                Education : '',
                Experience:'',
                Shift:'',
                DateFrom:'',
                DateTo:'',
                Salary:''
            }
        }
        CompanyReg(){
            if(this.state.CompanyName ==='' || this.state.Position === '' || this.state.Education === ''||
        this.state.Experience === ''|| this.state.Shift === ''|| this.state.DateFrom === '' || this.state.DateTo === ''
    || this.state.Salary === ''){
        alert('Insert Input Field Completly')
    }else{
            firebase.database().ref(`Jobs/`).push({
                CompanyName: this.state.CompanyName,
                Position: this.state.Position,
                Education: this.state.Education,
                Experience: this.state.Experience,
                Shift: this.state.Shift,
                DateFrom: this.state.DateFrom.toString(),
                DateTo: this.state.DateTo.toString(),
                Salary: this.state.Salary,
                uid: firebase.auth().currentUser.uid
            })
            this.setState({
            CompanyName :'' ,
            Position : '', 
            Education : '',
            Experience : '',
            Shift : '',
            DateFrom : '' ,
            DateTo : '',
            Salary : ''})
        }
    }
    handleChange = (event, index, value) => this.setState({Education : value});
    render(){
        return(
            <div >
                <div className="regPaper">
               <Paper className="appaper" zDepth={5} rounded={false} >
               <div  className="jobReg">
                   <h1>Job's Registration</h1>
               <TextField
      hintText="Company Name"
      value={this.state.CompanyName}
      onChange={(e)=>{
          this.setState({CompanyName: e.target.value})
      }}
    /><br />  <TextField
      hintText="Position"
      value={this.state.Position}
      onChange={(e)=>{
          this.setState({Position: e.target.value})
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
        <br />   <SelectField
        floatingLabelText="Experience"
        value={this.state.Experience}
        onChange={(e,i,v)=>{this.setState({Experience: v})}}
      >
        <MenuItem value='1 Year' primaryText="1 Year" />
        <MenuItem value='2 Year' primaryText="2 Year" />
        <MenuItem value='3 Year' primaryText="3 Year" />
        <MenuItem value='4 Year' primaryText="4 Year" />
        <MenuItem value='5 Year' primaryText="5 Year" />
      </SelectField><br />    <SelectField
    floatingLabelText="Shift"
    value={this.state.Shift}
    onChange={(e,i,v)=>{this.setState({Shift : v})}}
  >
    <MenuItem value='Morning' primaryText="Morning" />
    <MenuItem value='Evening' primaryText="Evening"/>
  </SelectField><br/> <TextField
      hintText="Salary"
      value={this.state.Salary}
      onChange={(e)=>{
          this.setState({Salary : e.target.value})
      }}
    /><br />
  Job Timing
  <TimePicker
          format="ampm"
          hintText="From"
          value={this.state.DateFrom}
          onChange={(event, date)=>{this.setState({DateFrom: date})}}
        />  <TimePicker
          format="ampm"
          hintText="To"
          value={this.state.DateTo}
          onChange={(event, date)=>{this.setState({DateTo: date})}}
        /><br /><br />
        <RaisedButton label="Submit" secondary={true} onClick={this.CompanyReg.bind(this)} />

              
               </div>
               </Paper>
               </div>
            </div>
        )
    }
}