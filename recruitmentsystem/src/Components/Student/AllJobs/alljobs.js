import React,{Component} from 'react';
import * as firebase from 'firebase';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class AllJob extends Component{
    constructor(){
        super()
        this.state={
            Alljobs:[],
            array:[],
            ClickStu:[],
            admin:'',
            jobsArray:[],
        }
    }
    componentDidMount(){
        let key = localStorage.getItem('uid')
        firebase.database().ref().child(`Users/${key}`).on('value',(snap)=>{
            let data1 = snap.val()
            this.setState({ClickStu : data1, admin: this.props.admin})
           
        })
        firebase.database().ref().child('Jobs').on('value',(snap)=>{
            let data = snap.val();
            let array = []
            for(let i in data){
                array.push(i)
            }

            this.setState({Alljobs: Object.values(data),
            array: array})
            console.log(this.state.Alljobs.CompanyName)
        })
    }
    DltJob(uid){
        console.log(uid)
        firebase.database().ref(`Jobs/${uid}`).remove();
    }
    
    applyJob(ind){
        var uid = localStorage.getItem('uid')
        let dataa = this.state.Alljobs[ind].Apply
        if(dataa){

        
        console.log(dataa)
     for(let i in dataa){
         if(dataa[i].uid === uid ){
             alert("You Already Applied")
             break;
         }
         else{
            if (this.state.ClickStu.Education){
                firebase.database().ref(`Jobs/${this.state.array[ind]}/Apply/${uid}`).set({
                    Name : this.state.ClickStu.name,
                    Email : this.state.ClickStu.Education,
                    uid : uid
                })
                alert('Applied')
            }
            else{
                alert('Update Your Information First')
            }

         }
        }
       
     }
     else{
        if(this.state.ClickStu.Education){
            firebase.database().ref(`Jobs/${this.state.array[ind]}/Apply/${uid}`).set({
                Name : this.state.ClickStu.name,
                Email : this.state.ClickStu.Education,
                uid :uid
                
            })
            alert('Applied')
        }
        else{
            alert('Update Your Information First')
        }

    }
    }
    render(){
        return(
            <div>
                <div className="borderCard">
                    {this.state.Alljobs.map((val,ind)=>{return(
                             <div className="cardDiv" key={ind}> 
                         <Card>
   
    <CardMedia
      overlay={<CardTitle title={val.CompanyName} subtitle={val.Position} />}
    >
    </CardMedia>
    <CardTitle title={val.Education} subtitle={val.Experience} />
    <CardText>
   <b> Salary : </b> {val.Salary}<br />
    </CardText>
    <CardActions>{this.state.admin?
     <FlatButton label="Delete" onClick={this.DltJob.bind(this,this.state.array[ind])}/>
    :
    <FlatButton label="Apply" onClick={this.applyJob.bind(this,ind)}/>
    }
    </CardActions>
  </Card> </div>
                        )
                    })}
                </div> 
            </div>
        )
    }
}