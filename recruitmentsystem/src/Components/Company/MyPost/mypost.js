import React, {Component} from 'react'
import * as firebase from 'firebase';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

export default class MyPost extends Component{
    constructor(){
        super()
        this.state={
            jobsArray:[],
            pushkey: []
        }
    }
    componentDidMount(){
        var uid = localStorage.getItem('uid')
        firebase.database().ref().child(`Jobs`).on('value',(snap)=>{
            let data = snap.val();
            if(data){
            let array = [];
            let arr = [];
            let data1 = snap.val();
            let array1 = []
            for(let i in data){
                
                 if(data[i].uid === uid){
                    array.push(data[i])
                    this.setState({jobsArray: array})
                }
            }
            for(let i in data1){
                array1.push(i)
                this.setState({pushkey: array1})
                }
        }else{}
    })
}
dltjobs(ind){  
    let push = this.state.pushkey[ind]
    console.log(push)
    firebase.database().ref().child(`Jobs/${push}`).remove()
    this.setState({jobsArray:[]})
    // this.props.histoy.push("/home")
    }
    render(){
        return(
            <div>
                   
                <div className="borderCard">
                {this.state.jobsArray.map((val ,ind)=>{
                    var apply = []
                    if(val.Apply){
                         apply = Object.values(val.Apply);
                    }
                 return   <div className="cardDiv" key={ind}> 
                         <Card>
  
    <CardMedia
      overlay={<CardTitle title={val.CompanyName} subtitle={val.Position} />}
    >
    </CardMedia>
    <CardTitle title={val.Education} subtitle={val.Experience} />
    <CardText>
   <b> Salary : </b> {val.Salary}<br />
   <div  className="applyStu">
   {apply.map((value, index)=>{return(
       <div>
          <p> {value.Name}</p>
          <p> {value.Email} </p>
          <hr />
       </div>)
   })}</div>
    </CardText>
    <CardActions>
     {/* <Link to="/home">  */}
     <FlatButton label="Delete" onClick={this.dltjobs.bind(this,ind)} />
    {/* </Link> */}
    </CardActions>
  </Card> </div>
                })}</div>
            </div>
        )
    }
}