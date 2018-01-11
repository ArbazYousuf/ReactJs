import React, { Component } from 'react';
import * as firebase from 'firebase'
import { Dialog, RaisedButton, FlatButton } from 'material-ui';

export default class ShowSlot extends Component {
    constructor() {
        super();
        this.state = {
            check: false,
            open: false
        }
    }

    componentDidMount() {
        let { slot, TimeFrom, TimeTo, datevalue} = this.props
        console.log(TimeFrom,' dfdf ', datevalue,' fdfd ',TimeTo)
        TimeFrom.setFullYear(datevalue.getFullYear());
        TimeFrom.setDate(datevalue.getDate());
        TimeFrom.setMonth(datevalue.getMonth());
        TimeTo.setFullYear(datevalue.getFullYear());
        TimeTo.setDate(datevalue.getDate());
        TimeTo.setMonth(datevalue.getMonth());
        var dateNow = String(datevalue.getDate())+'-'+String(datevalue.getMonth()+1)+'-'+String(datevalue.getFullYear())
        this.setState({date: dateNow})
        firebase.database().ref('bookings/').orderByChild('uniqe').equalTo(this.props.uniqe).on('value', snap => {
            if (snap.val()) {
                const booked = snap.val();
                var check = false;
                if(booked){
                  let bookings = []
                  for(let a in booked){
                    bookings.push(booked[a])
                  }
                  console.log(bookings)
                  check = (() => {
                    for(let i=0; i < bookings.length ; i++){
                      
                      let book = bookings[i];
                      let start = new Date(book.TimeFrom);
                      let end = new Date(book.TimeTo);
                      if((TimeFrom.getTime() < start.getTime() && TimeTo.getTime() > start.getTime()) || (TimeFrom.getTime() < end.getTime() && TimeTo.getTime() > end.getTime())||(TimeFrom.getTime() > start.getTime() && TimeTo.getTime() < end.getTime())){
                        return true
                      }
                    }
                  })()
                }
                this.setState({check})
            }
        })
    }

    handleBooking = () => {
        let { area, slot, TimeFrom, TimeTo, datevalue, uniqe } = this.props
        console.log()
        TimeFrom.setDate(datevalue.getDate())
        TimeTo.setDate(datevalue.getDate())
        firebase.database().ref('bookings').push({
            email: firebase.auth().currentUser.email,
            uid: firebase.auth().currentUser.uid,
            displayName: firebase.auth().currentUser.displayName,
            area,
            slot,
            uniqe,
            TimeFrom: String(TimeFrom),
            TimeTo: String(TimeTo),
            Date: String(this.props.datevalue),
            namearea: this.props.namearea,
        }).then(a => {
        })
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const actions = [
            <FlatButton
                label="Book Now"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleBooking}
            />,
            <RaisedButton
                label="close"
                primary={true}
                keyboardFocused={false}
                onClick={this.handleClose}
            />
        ];
        let slot = this.props.slot
        return (
            <div>
                {this.state.check ?
                    <RaisedButton label={slot} disabled />
                    :
                    <div>
                        <RaisedButton primary label={slot} onClick={this.handleOpen} />
                        <Dialog
                            title={"Detail Of " + slot}
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                        >
                            <div>
                                <h3>Book Your Slot</h3>
                            </div>
                        </Dialog>
                    </div>
                }

                {/* <Dialog></Dialog> */}
            </div>
        )
    }
}