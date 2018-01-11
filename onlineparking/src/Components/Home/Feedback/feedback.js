import React, { Component } from 'react';
import { database, auth } from 'firebase';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
export default class Feedback extends Component {
    constructor() {
        super()
        this.state = {
            message: '',
            allFeed: [],
            pushkey:[]
        }
    }
    sendFeedback() {
        database().ref().child(`Feedback/`).push({
            message: this.state.message,
            detail: {
                name: auth().currentUser.displayName,
                email: auth().currentUser.email,
                uid: auth().currentUser.uid
            }
        })
        this.setState({message:''})
    }
    dltFeed(ind) {
        console.log(ind)
        database().ref().child(`Feedback/${this.state.pushkey[ind]}`).remove()
    }
    componentDidMount() {
        database().ref().child(`Feedback/`).orderByChild('detail/uid').equalTo(localStorage.getItem('uid')).on('value', (snap) => {
            let pushkey = []
            let data = snap.val()
            if (data) {
                for(let i in data){
                    pushkey.push(i)
                }
                this.setState({pushkey})
                this.setState({ allFeed: Object.values(data) })
            }
            else{
                this.setState({allFeed:[],pushkey:[]})
            }
            console.log(this.state.pushkey)
        })
        
    }
    render() {
        return (
            <div>
                <div className="div1">
                    {this.state.allFeed.map((val, ind) => {
                        return (
                            <div className="cardDiv2" key={ind}>
                                <Card>
                                    <CardTitle title='Feedback' subtitle={val.detail.email} />
                                    <CardText>
                                        {val.detail.name} : {val.message}
                                    </CardText>
                                    {val.reply ?
                                        <CardText>
                                            Admin : {val.reply}
                                        </CardText> : null
                                    }
                                    <CardActions>
                                        <FlatButton label="Delete" onClick={this.dltFeed.bind(this, ind)} />
                                    </CardActions>
                                </Card>
                            </div>
                        )
                    })}
                </div>
                <div className="div2">
                    <Paper zDepth={1} className="div2paper">
                        <TextField
                            onChange={(e)=>{this.setState({message: e.target.value})}}
                            value={this.state.message}
                            hintText="Comment Your Feedback..!"
                        /><br />
                        <RaisedButton label="Submit" onClick={this.sendFeedback.bind(this)} secondary={true} />
                    </Paper>
                </div>
            </div>

        )
    }
}