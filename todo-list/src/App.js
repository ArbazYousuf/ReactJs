import React, { Component } from 'react';
import './App.css';
// import Showlist from './Component/todoList'
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {orange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  underlineStyle: {
    borderColor: orange500,
  },
 
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      todo: [],
      value: ''
    }
  }
  

  Submit() {
    if (this.state.value) {
      let todos = this.state
      todos.todo.push(this.state.value)
      this.setState({ todo: todos.todo, value: "" })
    }
  }
  upDate = () => {
    console.log("Update")
    let tod = this.state
    tod.todo[this.state.currentIndex] = this.state.value;
    this.setState({
      isEdit: false,
      currentIndex: -1,
      value: "",
      todo: tod.todo
    })
  }
  edit = (val, ind) => {
    this.setState({
      isEdit: true,
      currentIndex: ind,
      value: val
    })
  }
  render() {
    let isEdit = this.state.isEdit;
    return (
      <div className="App">
       <AppBar
       title="Todo List React"
       iconClassNameRight="muidocs-icon-navigation-expand-more"
     />
     <TextField
      hintText="Enter Your Name"
      underlineFocusStyle={styles.underlineStyle}
      type="text" value={this.state.value} onChange={(e) => { this.setState({ value: e.target.value }) }} id="inp"
    />
     <FlatButton label={isEdit ? 'Update' : 'Submit'} secondary={true} onClick={isEdit ? this.upDate.bind(this) : this.Submit.bind(this)}/>
        <div>
          
     
                  {this.state.todo.map((val, ind) => {
                    return <div key={ind}>{ind + 1} . &nbsp; &nbsp; &nbsp; {val}  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <RaisedButton
      backgroundColor="#a4c639"
      label="Delete"
      className="Edit"
      onClick={() => {
       this.setState(prev => ({
         todo: prev.todo.filter((i, index) => ind !== index)
                }))
              }}
    /> &nbsp; &nbsp; &nbsp; &nbsp;
    <RaisedButton
      secondary={true}
     label="Edit"
      className="Edit"
      onClick={() => { this.edit(val, ind) }}
    />
    <br/><br/></div> 
          })}
        </div>
      </div>
    );
  }
}

export default App;
