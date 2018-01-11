import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Post from '../Post/post'
import loginMiddleWare from '../../Store/Middleware/middleware';
import ShowData from '../ShowPost/show'

function mapDispatchToProps(dispatch) {
    return {
        post: function () {
            return dispatch(loginMiddleWare.getPost())
        }
    }
}
function mapStateToProps(state) {
    return {
        allState: state.Auth
    }
}
class Home extends Component {
    constructor() {
        super()
        this.state = {
            slideIndex: 0,
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.allState)
    }
    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };
    componentDidMount() {
        this.props.post()
    }
    slideIndexValue(){
        this.setState({slideIndex:0})
    }
    render() {
        return (
            <div>
                <div>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab label="All Accessories" value={0} />
                        <Tab label='Post' value={1} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                    >
                        <div>
                            <ShowData />
                        </div>
                        <div style={styles.slide}>
                            <Post changeIndex={this.slideIndexValue.bind(this)} />
                        </div>
                    </SwipeableViews>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);