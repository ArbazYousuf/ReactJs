import React, { Component } from 'react';
import { DatePicker, RaisedButton, TimePicker, Paper, CircularProgress } from 'material-ui';
import ShowSlot from './ShowSlot/showslot'
import { database } from 'firebase';

export default class Booking extends Component {
    constructor() {
        super()
        this.state = {
            datevalue: '',
            Date: '',
            TimeFrom: '',
            TimeTo: '',
            flag: false,
            allSlot: [],
            loading: true,
            areaName: '',

        }
    }
    openSlot() {
        let datevalue = new Date()
        var dateNow = String(datevalue.getDate()) + '-' + String(datevalue.getMonth() + 1) + '-' + String(datevalue.getFullYear());
        let datevalue2 = this.state.datevalue;
        var dateNow2 = String(datevalue2.getDate()) + '-' + String(datevalue2.getMonth() + 1) + '-' + String(datevalue2.getFullYear());
        var timevalue = String(datevalue.getHours()) + '-' + String(datevalue.getMinutes());
        let datevalue3 = this.state.TimeFrom
        var timevalue2 = String(datevalue3.getHours()) + '-' + String(datevalue3.getMinutes());
        if (this.state.Date === '' || this.state.TimeFrom === '' || this.state.TimeTo === '') {
            alert('Insert Time & Date Completly')
        }
        else {
            if (dateNow < dateNow2) {
                this.setState({ flag: true })
            } else {  if (dateNow == dateNow2 && timevalue <= timevalue2) {
                console.log(timevalue <= timevalue2)
                this.setState({flag: true})
            }else{alert('Enter Furture Time 2')} }
           
        }
    }
    componentDidMount() {
        database().ref().child(`places/${this.props.match.params.key}`).on('value', (snap) => {
            let data = snap.val()
            this.setState({ allSlot: data.slots, areaName: data.key, loading: false })
        })
    }
    Dateset(ev, date) {
        this.setState({ datevalue: date, flag: false })
        var date = date.toString()
        var DateSet = date.slice(3, 15)
        console.log(DateSet)
        this.setState({ Date: DateSet })
    }
    timeFrom(ev, date) {
        // var date = date.toString()
        // var timeFrom = date.slice(15, 24)
        // console.log(timeFrom)
        this.setState({ TimeFrom: date, flag: false })
    }
    timeTo(ev, date) {
        // var date = date.toString()
        // var timeTo = date.slice(15, 24)
        // console.log(timeTo)
        this.setState({ TimeTo: date, flag: false })
    }
    render() {
        return (
            this.state.loading ? <CircularProgress /> :
                <div>
                    <div className="regPaper">
                        <Paper className="appaper" zDepth={5} rounded={false} >
                            <div className="jobReg">
                                <h1>{this.state.areaName} Parking Booking</h1>
                                <DatePicker
                                    hintText="Date"
                                    value={this.state.datevalue}
                                    onChange={this.Dateset.bind(this)}
                                />

                                <TimePicker
                                    format="ampm"
                                    hintText="Time From"
                                    value={this.state.DateFrom}
                                    onChange={this.timeFrom.bind(this)}
                                />

                                <TimePicker
                                    format="ampm"
                                    hintText="Time To"
                                    value={this.state.DateTo}
                                    onChange={this.timeTo.bind(this)}
                                /><br /><br />
                                <RaisedButton label="Submit" secondary={true} onClick={this.openSlot.bind(this)} />


                            </div>
                        </Paper>
                    </div>
                    <div className='slotdiv'>
                        {this.state.flag ?
                            <div>
                                {
                                    this.state.allSlot.map((value, index) => {
                                        console.log(this.state.allSlot.slots)

                                        return (
                                            <div key={index} className="paperdiv">
                                                <ShowSlot
                                                    namearea={this.state.areaName}
                                                    area={this.props.match.params.key}
                                                    uniqe={this.props.match.params.key + '/' + (value + (index + 1))}
                                                    slot={value + (index + 1)}
                                                    datevalue={this.state.datevalue}
                                                    TimeTo={this.state.TimeTo}
                                                    TimeFrom={this.state.TimeFrom}
                                                />
                                                {/* <Paper style={style} onClick={this.SendFirebase.bind(this,index)} zDepth={5} >
                                         {value}{index+1}
                                    </Paper> */}
                                            </div>
                                        )
                                    })}
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                </div>
        )
    }
}
const style = {
    width: 100,
    height: 45,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

