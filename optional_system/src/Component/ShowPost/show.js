import React, { Component } from 'react'
import { connect } from 'react-redux';
import loginMiddleWare from '../../Store/Middleware/middleware';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};
function mapStateToProps(state) {
    return {
        showData: state.Post,
        myuid: state.Auth,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        price: function (price) {
            return dispatch(loginMiddleWare.postPrice(price))
        },
        purchase: function (purchase) {
            return dispatch(loginMiddleWare.Purchase(purchase))
        },
        deletePost: function (key) {
            return dispatch(loginMiddleWare.deletePost(key))
        }
    }
}
class ShowData extends Component {
    constructor() {
        super()
        this.state = {
            allPost: [],
            pushKey: [],
            lastestPrice: '',
            value: 1,
            myuid: '',
            Name: '',
            flag: false,
        }
    }
    componentWillReceiveProps(nextProps) {

        this.setState({ myuid: nextProps.myuid.uid, Name: nextProps.myuid.displayName })
        let pushKey = []
        let Purchase = []
        let data = nextProps.showData
        for (let i in data) {
            // data(i).push(pushKey)
            pushKey.push(i)

        }
        let post = Object.values(nextProps.showData)
        let ajjDate = String(new Date())
        ajjDate = ajjDate.slice(3, 15)
        console.log(ajjDate)
        for (let i in post) {
            if (post[i].Date == ajjDate) {
                if (post[i].bidUid) {
                    Purchase.push(post[i])
                    this.props.purchase(this.state.pushKey[i])
                }
                else {
                    this.props.deletePost(this.state.pushKey[i])
                    console.log(this.state.pushKey[i])
                }
            }
        }
        this.setState({ allPost: post, pushKey })
    }
    componentDidMount() {
        this.setState({ uids: localStorage.getItem('uids') })


    }
    sendPrice(key, ind) {
        let state = { lastestPrice: this.state.lastestPrice, key: key, Name: this.state.Name, data: this.state.allPost[ind] }
        // console.log(this.state.allPost[ind])
        this.props.price(state)
        this.setState({ lastestPrice: '' })
    }
    handleChange = (event, index, value) => {
        this.setState({ value })
        let data = Object.values(this.props.showData);
        let Category = [];
        for (let i in data) {
            if (value === 'Mobile') {
                if (data[i].Category === 'Mobile') {
                    Category.push(data[i])
                    this.setState({ allPost: Category })
                } else { this.setState({ allPost: Category }) }
            }
            if (value === 'Laptop') {
                if (data[i].Category === 'Laptop') {
                    Category.push(data[i])
                    this.setState({ allPost: Category })
                }
                else { this.setState({ allPost: Category }) }
            }
            if (value === 'LED') {
                if (data[i].Category === 'LED') {
                    Category.push(data[i])
                    this.setState({ allPost: Category })
                } else { this.setState({ allPost: Category }) }
            }
            if (value === 1) {
                this.setState({ allPost: data })
            }
        }
    }
    render() {
        return (
            <div>
                <div className="borderCard">
                    <div className="searchField">
                        <SelectField
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={1} primaryText="Category" />
                            <MenuItem value={'Laptop'} primaryText="Laptop" />
                            <MenuItem value={'Mobile'} primaryText="Mobile" />
                            <MenuItem value={'LED'} primaryText="LED" />
                        </SelectField>
                    </div>
                    {this.state.allPost ? this.state.allPost.map((val, ind) => {
                        return (
                            <div>
                                {this.state.myuid === val.uids ? null :
                                    <div className="cardDiv" key={ind}>
                                        <Card>
                                            <img src={val.image} className="setImg" alt={val.Category} />
                                            <div className="forCard">
                                                <CardTitle title={val.Name} subtitle={val.Category} />
                                                <CardText>
                                                    <b> Last Date : </b> {val.Date} <br />
                                                    <b> Price : </b> {val.Price}<br />
                                                    <b> City : </b> {val.City} <br />
                                                    <b> Number : </b> {val.Number} <br />
                                                    {val.bidName ? <div> <b> HighestBid </b>: {val.bidPrice}<div>
                                                        <div><RaisedButton label="Bidder" primary={true} style={style} onClick={() => { this.setState({ flag: !this.state.flag }) }} /></div>

                                                        {this.state.flag ? Object.values(val.Bind).map((value, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <b> Name : </b> {value.bidName} <br />
                                                                    <b> Bid Price : </b> {val.bidPrice} <br />
                                                                    <hr/>
                                                                </div>
                                                            )
                                                        }) : null}
                                                    </div> </div>
                                                        : null}
                                                </CardText>
                                                <TextField
                                                    floatingLabelText="Bind"
                                                    type="number"
                                                    value={this.state.lastestPrice}
                                                    onChange={(ev) => { this.setState({ lastestPrice: ev.target.value }) }}
                                                />

                                                <FlatButton label="Submit" onClick={this.sendPrice.bind(this, this.state.pushKey[ind], ind)} />
                                                <br />
                                                <br />
                                                <div>
                                                </div>

                                            </div>
                                        </Card>
                                    </div>}</div>)
                    }) : <div></div>}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowData)