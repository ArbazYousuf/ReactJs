import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Area from './Areas/area'
import Feedback from './Feedback/feedback'
import { database } from 'firebase';
import MyBooked from './MyBooked/mybooked';
import AllBooked from '../AllBooking/allbooking'
import AdminFd from '../AdminFeedback/adminfd'
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            slideIndex: 1,
            places: [],
            AccType: '',
            areakey:[]
        }
    }
    componentDidMount() {
        database().ref(`Users/${localStorage.getItem('uid')}`).on('value', (snap) => {
            let data = snap.val()
            if (data.AccType === 'Admin') {
                this.setState({ AccType: 'Admin' })
                console.log(this.state.AccType)
            }
        })
        database().ref('places').on('value', snap => {
            let val = snap.val();
            for (let i in val){
                let arr =[]
                arr.push(i)
                this.setState({areakey: arr})
            }
            let places = Object.keys(val).map(pid => {
                let value = val[pid]
                return { ...value, pid }
            });
            console.log({ places })
            this.setState({ places })
        })
    }
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    render() {
        return (
            <div>
                <div>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                                <Tab label={this.state.AccType === 'Admin' ? "Areas": "Booking"} value={0} />
                                <Tab label={this.state.AccType === 'Admin' ? 'All Booking': 'My Booking'} value={1} />
                                <Tab label="Feedback" value={2} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                    >
                                <div>
                                    <Area AccType={this.state.AccType} areakey={this.state.areakey} places={this.state.places} />
                                </div>
                                <div style={styles.slide}>
                                {this.state.AccType === 'Admin' ? <AllBooked /> : <MyBooked />}
                                </div>
                                <div style={styles.slide}>
                                   {this.state.AccType === 'Admin' ? <AdminFd /> : <Feedback />} 
                                </div>
                        
                    </SwipeableViews>
                </div>
            </div>
        )
    }
}
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