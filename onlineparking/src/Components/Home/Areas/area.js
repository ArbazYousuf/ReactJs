import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom';
import { database } from 'firebase'

export default class Area extends Component {
    constructor() {
        super()
        this.state = {
            AccType: '',
            Number: 0,
            Name: '',
            areakey: [],
            places:[]

        }
    }
    componentWillReceiveProps() {
        this.setState({ AccType: this.props.AccType })
    }
    componentDidMount(){
        database().ref().child(`places/`).on('value',(snap) => {
            let pushkey = []
            if(snap.val()){
                let data = snap.val()
                for(let i in data){
                    pushkey.push(i)
                    this.setState({pushkey})
                }
                let places = Object.keys(data).map(pid => {
                    let value = data[pid]
                    return { ...value, pid }
                });
                console.log({ places })
                this.setState({ places })
            }
        })
    }
    areasend() {
        database().ref('places').push({
            key: this.state.Name, slots: (() => {
                let arr = []
                arr.length = this.state.Number
                arr.fill('slot ')
                return arr
            })()
        })
        this.setState({ Number: '', Name: '' })
    }
    dltarea(ind) {
        database().ref(`places/${this.state.pushkey[ind]}`).remove()
       
    }
    render() {
        return (
            <div>
                <Paper zDepth={5}>
                    <div>
                        All Parking Area
                        <br />
                        <hr />
                        {this.state.AccType === 'Admin' ? <div> <TextField
                            hintText="Area Name"
                            value={this.state.Name}
                            onChange={(e) => { this.setState({ Name: e.target.value }) }}
                        /><br />
                            <TextField
                                hintText="Number of Slot"
                                value={this.state.Number}
                                onChange={(e) => { this.setState({ Number: Number(e.target.value) }) }}
                            /><br />
                            <RaisedButton label="Add" onClick={this.areasend.bind(this)} primary={true} />
                        </div> :
                            <div></div>}
                        <Table>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Area Name</TableHeaderColumn>
                                    <TableHeaderColumn>Booking</TableHeaderColumn>
                                    {this.state.AccType === 'Admin' ? <TableHeaderColumn>Delete</TableHeaderColumn> : null}
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    this.state.places.map((a, index) =>
                                        <TableRow key={index}>
                                            <TableRowColumn>{index + 1}</TableRowColumn>
                                            <TableRowColumn>{a.key}</TableRowColumn>
                                          {this.state.AccType === 'Admin' ? 
                                          <TableRowColumn><Link to={'/areabooking/'+ a.pid}><RaisedButton label="View" secondary={true} /></Link></TableRowColumn> 
                                          :
                                          <TableRowColumn><Link to={"/area/" + a.pid}><RaisedButton label="Booking" secondary={true} /></Link></TableRowColumn>
                                        }  
                                            {this.state.AccType === 'Admin' ? <TableRowColumn><RaisedButton label="Delete" onClick={this.dltarea.bind(this, index)} primary={true} /></TableRowColumn> : null}
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </div>
                </Paper>
            </div>
        )
    }
}
// componentDidMount(){
//     this.setState({AccType: this.props.AccType}) 
//         database().ref('places').push({ key: 'gizri', slots: (() => {
//             let arr = []
//             arr.length = 20
//             arr.fill('slot ')
//             return arr
//         })() })
//     }