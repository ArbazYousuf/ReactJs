import React, {Component} from 'react'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from 'firebase';

export default class AllCompany extends Component{
constructor(){
    super()
    this.state={
        AllCompany:[],
        admin:''
    }
}
DltCompany(key){
    console.log(key)
    firebase.database().ref(`Users/${key}`).remove()
}
 componentDidMount(){
         firebase.database().ref().child('Users').on('value', (snap)=>{
             let data = Object.values(snap.val())
             let array =[]
            for(let i in data){
                if(data[i].accType === "Company")
                array.push(data[i])
                this.setState({AllCompany : array,admin: this.props.admin})
            }
         })   
        }
render(){
    return(
        <div>
            <div>
                {this.state.admin?
                    <Table>
                    <TableHeader displaySelectAll={false}>
                      <TableRow >
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                          {this.state.AllCompany.map((val, ind)=>{
                              return(
                      <TableRow key={ind}>
                        <TableRowColumn>{ind}</TableRowColumn>
                        <TableRowColumn>{val.name}</TableRowColumn>
                        <TableRowColumn>{val.email}</TableRowColumn>
                        <TableRowColumn> <FlatButton label="Delete" onClick={this.DltCompany.bind(this,val.key)} primary={true} /></TableRowColumn>
                      </TableRow>
                              ) 
                          })}
                          </TableBody>
                          </Table>
                          :

            
          <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow >
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
                {this.state.AllCompany.map((val, ind)=>{
                    return(
            <TableRow key={ind}>
              <TableRowColumn>{ind}</TableRowColumn>
              <TableRowColumn>{val.name}</TableRowColumn>
              <TableRowColumn>{val.email}</TableRowColumn>
            </TableRow>
                    ) 
                })}
                </TableBody>
                </Table>}
            </div>
            
        </div>
    )
}
}