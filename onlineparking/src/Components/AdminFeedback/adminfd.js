import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { auth, database } from 'firebase';
import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
export default class AdminFd extends Component {
    constructor() {
        super()
        this.state = {
            message: '',
            alldata: [],
            pushkey: [],
            reply:''
        }
    }
    componentDidMount() {
        database().ref().child(`Feedback/`).on('value', (snap) => {
            let alldata = []
            let pushkey = []
                if(snap.val()){
                    let data = snap.val()
                    console.log(data)
                    for (let i in data) {
                        pushkey.push(i)
                    }
                    this.setState({pushkey : pushkey,alldata: Object.values(data) })
                }else{
                        this.setState({pushkey:[],alldata:[]})
                }} )
    }

    replyFeed(ind){
        database().ref(`Feedback/${this.state.pushkey[ind]}`).update({
            reply: this.state.reply
        })
        this.setState({reply:''})
    }
    render() {
        return (
            <div>
                
                    <div>
                        <div className='div1'>
                            {this.state.alldata.map((val, ind) => {
                                return (
                                    <div className="cardDiv2" key={ind}>
                                        <Card>

                                            <CardTitle title='Feedback' />
                                            <CardText>
                                            {val.detail.name} :   {val.message}
                                            </CardText>
                                            <CardText>
                                              {val.reply}
                                            </CardText>
                                             <CardText>
                                            <TextField
                                                hintText="reply"
                                                onChange={(e)=>{this.setState({reply: e.target.value})}}
                                                value={this.state.reply}
                                            /><br />
                                            <FlatButton label="Reply" onClick={this.replyFeed.bind(this, ind)} />
                                        </CardText>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                      
                    </div>
          
            </div>
        )
    }
}
