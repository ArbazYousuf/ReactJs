import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import loginMiddleWare from '../../Store/Middleware/middleware';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

function mapDispatchToProps(dispatch) {
    return {
        hisData : function (myuid) {
            console.log(myuid)
            return dispatch(loginMiddleWare.hisData(myuid))
        } 
    }
}
function mapStateToProps(state) {
    return {
        myuid: state.Auth.uid,
        Purchase : state.Data
    }
}
class Detail extends Component {
    constructor() {
        super()
        this.state = {
            slideIndex: 0,
            open: false,
            myuid:null,
            Purchase:null
        }
    }
    componentWillReceiveProps(nextProps) {
        let uid = this.props.match.params.key
        // this.props.hisData(uid)
        this.setState({uid})
        this.setState({Purchase : nextProps.Purchase.Purchase})
    
        
       
    }
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    componentDidMount() {
      setTimeout(()=>{
          this.props.hisData(this.state.uid)
      },3000)
    
          
        
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={()=>{this.setState({ open: false,})}}
            />,
        
        ];
        return (
            <div>

                        <div className="table2">{console.log(this.state.Purchase)}
                            <Table >
                                <TableHeader displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>ID</TableHeaderColumn>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Price</TableHeaderColumn>
                                        <TableHeaderColumn>All Details</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                {this.state.Purchase? Object.values(this.state.Purchase).map((val,ind)=>{
                                    return(

                                    <TableRow>
                                        <TableRowColumn>{ind+1}</TableRowColumn>
                                        <TableRowColumn>{val.data.Name}</TableRowColumn>
                                        <TableRowColumn>{val.data.bidPrice}</TableRowColumn>
                                        <TableRowColumn>
                                            <RaisedButton label="Bid's" onClick={()=>{this.setState({ open: true,})}} />
                                            <Dialog
                                                title="Bid's"
                                                actions={actions}
                                                modal={true}
                                                open={this.state.open}
                                            >
                                               <div>
                                                   <img src={val.data.image} style={{width: '10%'}} /> <br />
                                                   <b>Post Name </b>{val.data.postName}<br/>
                                                   <b>End Date </b>{val.data.Date}<br/>
                                                   <b>Category </b>{val.data.Category}<br/>
                                                   <b>Initial Price </b>{val.data.Price}<br/>
                                               </div>
                                             </Dialog>
                                        </TableRowColumn>
                                    </TableRow>
                                    )
                                }): null}
                                </TableBody>
                            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);