import React, { Component } from 'react'
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton  from 'material-ui/FlatButton'
import * as firebase from 'firebase'

export default class allBooking extends Component {
    constructor() {
        super()
        this.state = {
            allBooking: [],
            pushKey:[]
        }
    }
    componentDidMount() {
        let uid = localStorage.getItem('uid')
        firebase.database().ref('bookings/').on('value', (snap) => {
            if (snap.val()) {
                let pushkey = []
                let data = snap.val()
                for(let i in data){
                    pushkey.push(i)
                    this.setState({pushKey: pushkey})
                }
                this.setState({ allBooking: Object.values(data) })
            }else{this.setState({allBooking:[],push:[]})}
        })
    }
    dltbooking(ind){
        firebase.database().ref().child(`bookings/${this.state.pushKey[ind]}`).remove()
    }
    render() {
        return (
            <div>
                <div className="borderCard">
                    {this.state.allBooking.map((val, ind) => {
                        return (
                            <div className="cardDiv" key={ind}>
                                <Card>
                                    <CardMedia overlay={<CardTitle title={val.displayName} />}>
                                    </CardMedia>
                                    <CardTitle title={val.namearea} subtitle={"Time From : " + val.TimeFrom.slice(15,21) + '   ' + 'Time To : ' + val.TimeTo.slice(15, 21)} />
                                    <CardText>
                                        <b>Slot : </b> {val.slot} <br />
                                    </CardText>
                                    <CardActions>
                                         <FlatButton label="Delete"  onClick={this.dltbooking.bind(this,ind)} />
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}