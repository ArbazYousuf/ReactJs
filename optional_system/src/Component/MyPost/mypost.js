import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loginMiddleWare from '../../Store/Middleware/middleware';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

function mapStateToProps(state) {
    return {
        showData: state.Post,
        myuid: state.Auth
    }
}
function mapDispatchToProps(dispatch) {
    return {
        post: function () {
            return dispatch(loginMiddleWare.getPost())
        },
        dltpost: function (key) {
            return dispatch(loginMiddleWare.dltpost(key))
        }
    }
}
class Mypost extends Component {
    constructor() {
        super()
        this.state = {
            allPost: [],
            pushKey: [],
            myuid: '',
        }
    }
    componentWillMount() {
        this.props.post()
    }
    componentWillReceiveProps(nextProps) {
        let pushKey = []
        let data = nextProps.showData
        this.setState({ myuid: nextProps.myuid.uid })
        for (let i in data) {
            pushKey.push(i)
        }
        let post = Object.values(nextProps.showData)
        this.setState({ allPost: post, pushKey })
    }
    dltmypost(key) {
        console.log(key)
        this.props.dltpost(key)
    }
    render() {
        return (
            <div>
                {this.state.allPost.map((val, ind) => {
                    return (
                        <div key={ind}>
                            {val.uids === this.state.myuid ?
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
                                                                <hr />
                                                            </div>
                                                        )
                                                    }) : null}
                                                </div> </div>
                                                    : null}
                                            </CardText>
                                            <Link to={'/update/' + this.state.pushKey[ind]}> <RaisedButton label="Update" /> </Link>  <RaisedButton label="Delete" onClick={this.dltmypost.bind(this, this.state.pushKey[ind])} />
                                            <br />
                                            <br />
                                            <div>
                                            </div>

                                        </div>
                                    </Card>
                                </div> : null
                            } </div>)

                })}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Mypost);