import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loginMiddleWare from '../../Store/Middleware/middleware';
import { DatePicker } from 'material-ui'
import FlatButton from 'material-ui/FlatButton';

function mapStateToProps(state) {
    return {
        updated: state.Post,
        displayName : state.Auth.displayName,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        post: function (post) {
            return dispatch(loginMiddleWare.post(post))
        }
    }
}
class Post extends Component {
    constructor() {
        super()
        this.state = {
            Name: '',
            Category: '',
            Price: '',
            image: null,
            flag: false,
            datevalue: '',
            Date: '',
            postName:''
        }
    }
    Dateset(ev, date) {
        this.setState({ datevalue: date, flag: false })
        var ajjDate = String(new Date());
        ajjDate = ajjDate.slice(4, 15)
        var date = date.toString()
        var DateSet = date.slice(4, 15)
        console.log(DateSet)
        if (ajjDate >= DateSet) {
            alert('InCorrect Date')

        } else {

            this.setState({ Date: DateSet, flag: true })
        }
    }
    postReg() {
        if (this.state.flag === true) {
            this.props.post(this.state)
            this.setState({
                Name: '',
                Category: '',
                Price: '',
                image: null,
                datevalue: '',
                image: '',
                City: '',
                Number: '',
                postName:''
            })
            this.props.changeIndex()
        } else {
            alert('InCorrect Date')
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({postName : nextProps.displayName})
    }
    handleChange = (event, index, value) => this.setState({ Education: value });
    render() {
        return (
            <div >
                <div className="regPaper">
                    <Paper className="appaper" zDepth={5} rounded={false} >
                        <div className="jobReg">
                            <h1 className="hStyle">Accessories</h1>
                            <TextField
                                hintText="Name"
                                value={this.state.Name}
                                onChange={(e) => {
                                    this.setState({ Name: e.target.value })
                                }}
                            /><br />   <SelectField
                                floatingLabelText="Category"
                                value={this.state.Category}
                                onChange={(e, i, v) => { this.setState({ Category: v }) }}
                            >
                                <MenuItem value='Laptop' primaryText="Laptop" />
                                <MenuItem value='Mobile' primaryText="Mobile" />
                                <MenuItem value='LED' primaryText="LED" />

                            </SelectField><br />
                            <TextField
                                hintText="City"
                                value={this.state.City}
                                onChange={(e) => {
                                    this.setState({ City: e.target.value })
                                }}
                            />
                            <br />  <TextField
                                hintText="Mobile Number"
                                value={this.state.Number}
                                onChange={(e) => {
                                    this.setState({ Number: e.target.value })
                                }}

                            />
                            <br />
                            <DatePicker
                                hintText="End Date"
                                value={this.state.datevalue}
                                onChange={this.Dateset.bind(this)}
                            />
                            <br />
                            <TextField
                                hintText="Price"
                                value={this.state.Price}
                                onChange={(e) => {
                                    this.setState({ Price: e.target.value })
                                }}
                            />
                            <br />
                            <FlatButton
                                label="Choose an Image"
                                labelPosition="before"
                                style={styles.uploadButton}
                                containerElement="label"
                                onChange={(e) => { this.setState({ image: e.target.files[0] }) }}
                            >
                                <input type="file" style={styles.uploadInput} />
                            </FlatButton>
                            <br /><br />
                            <Link to="/home">   <RaisedButton label="Submit" secondary={true} onClick={this.postReg.bind(this)} /> </Link>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}
const styles = {
    uploadButton: {
      verticalAlign: 'middle',
    },
    uploadInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    },
  };

export default connect(mapStateToProps, mapDispatchToProps)(Post)