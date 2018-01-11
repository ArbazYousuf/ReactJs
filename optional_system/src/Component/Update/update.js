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

    }
}
function mapDispatchToProps(dispatch) {
    return {
        update: function (state) {
            return dispatch(loginMiddleWare.update(state))
        },
        post: function () {
            return dispatch(loginMiddleWare.getPost())
        }
    }
}
class Update extends Component {
    constructor() {
        super()
        this.state = {
            Name: '',
            Category: '',
            Price: '',
            image: null,
            Time: '',
            flag: false,
            datevalue: '',
            Date: ''
        }
    }
    Dateset(ev, date) {
        this.setState({ datevalue: date, flag: false })
        var date = date.toString()
        var DateSet = date.slice(3, 15)
        console.log(DateSet)
        this.setState({ Date: DateSet })
    }
    updatePost() {
        this.props.update(this.state)
        this.setState({
            Name: '',
            Category: '',
            Price: '',
            Date: '',
            datevalue: '',
            City:'',
            Number:'',
        })
    }

    componentWillReceiveProps(nextProps) {
        //     let key = nextProps.match.params.key
        //     this.setState({key : key})
        //     if(nextProps.updated[key]){
        //     let props = nextProps.updated[key]
        //     this.setState({ Name: props.Name, Category: props.Category, Date: props.Date, })



        // }
    }

    componentDidMount() {
        let params = this.props.match.params.key;
        let key = this.props.match.params.key
        this.setState({ key: key })
        if (this.props.updated[key]) {
            let props = this.props.updated[key]
            this.setState({ Name: props.Name, Category: props.Category, Date: props.Date, Price: props.Price,City: props.City,Number : props.Number })
            console.log(props.Category)
            setTimeout(function () { console.log(props.datevalue); }, 3000);

        }

        // this.props.update(params)
        console.log(this.props.updated.params)
    }

    render() {
        return (
            <div >
                <div className="regPaper">
                    <Paper className="appaper" zDepth={5} rounded={false} >
                        <div className="jobReg">
                            <h1>Accessories</h1>
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
                                <MenuItem value='Phone' primaryText="Phone" />
                                <MenuItem value='Laptop' primaryText="Laptop" />
                                <MenuItem value='LED' primaryText="LED" />

                            </SelectField><br />
                            <TextField
                                hintText="City"
                                value={this.state.City}
                                onChange={(e) => {
                                    this.setState({ City: e.target.value })
                                }}
                                 />
                            <br />
                            <TextField
                                hintText="Number"
                                value={this.state.Number}
                                onChange={(e) => {
                                    this.setState({ Number: e.target.value })
                                }}
                                />
                            <br />
                            <TextField
                                hintText="Date"
                                value={this.state.Date}
                                disabled />
                            <br />
                            <TextField
                                hintText="Price"
                                value={this.state.Price}
                                onChange={(e) => {
                                    this.setState({ Price: e.target.value })
                                }}
                                disabled />
                            <br />
                            <FlatButton
                                label="Choose an Image"
                                labelPosition="before"
                                style={styles.uploadButton}
                                containerElement="label"
                                onChange={(e) => { this.setState({ image: e.target.files[0] }) }}
                            >
                                <input type="file" style={styles.uploadInput} />
                                </FlatButton> <br /><br />
                            <Link to="/myposts">   <RaisedButton label="Update" secondary={true} onClick={this.updatePost.bind(this)} /> </Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(Update)