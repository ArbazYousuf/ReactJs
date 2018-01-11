import * as firebase from 'firebase'
import storeAction from '../Action/action';

export default class loginMiddleWare {
    static Login(state) {

        return (dispatch) => {

            firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                .then((user) => {
                    dispatch(storeAction.login(user))
                    // this.props.history.push("/home")
                    localStorage.setItem('uids', user.uid)
                })
                .catch((ev) => {
                    alert('Not Login')
                })
        }
    }
    static Signup(state) {
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(() => {

                    let uids = firebase.auth().currentUser.uid;
                    localStorage.setItem('uids', uids)
                    firebase.storage().ref(`image/${state.image.name}`).put(state.image).then(function (user) {

                        firebase.storage().ref(`image/${state.image.name}`).getDownloadURL().then(function (url) {
                            firebase.auth().currentUser.updateProfile({
                                displayName: state.name,
                                photoURL: url
                            })
                        }).then(() => {
                            firebase.database().ref(`Users/${uids}`).set({
                                email: state.email,
                                name: state.name,
                                password: state.password,
                                key: uids,
                            })
                        }).then(() => {
                            dispatch(storeAction.signup(state))
                        })
                    })
                })
                .catch(ev => { console.log(ev) })

        }
    }
    static post(post) {
        return (dispatch) => {
            let uids = localStorage.getItem('uids')
            firebase.storage().ref(`image/${post.image.name}`).put(post.image).then(function (user) {
                firebase.storage().ref(`image/${post.image.name}`).getDownloadURL().then(function (url) {
                    firebase.database().ref().child(`postData/`).push({
                        Name: post.Name,
                        Price: post.Price,
                        image: url,
                        Category: post.Category,
                        uids: uids,
                        img: post.image,
                        imgname: post.image.name,
                        Date: post.Date,
                        datevalue: String(post.datevalue),
                        City : post.City,
                        Number : post.Number,
                        postName: post.postName
                    })
                })
            })
        }
    }
    static getPost() {
        return (dispatch) => {
            // let uids = localStorage.getItem('uids')
            firebase.database().ref().child(`postData/`).on('value', (snap) => {
                if (snap.val()) {
                    // console.log(snap.val())
                    dispatch(storeAction.post(snap.val()))
                }
            })
        }
    }
    static postPrice(price) {
        return (dispatch) => {
            let uids = localStorage.getItem('uids')
            // firebase.database().ref().child(`postData/${price.key}`).on('value', (snap) => {
            let data = price.data
            console.log(data.Price < price.lastestPrice)
            // console.log(price.lastestPrice)
            if (data.Price < price.lastestPrice) {
                if (data.bidPrice) {
                    if (data.bidPrice < price.lastestPrice) {
                        firebase.database().ref().child(`postData/${price.key}`).update({
                            bidName: price.Name,
                            bidPrice: price.lastestPrice,
                            bidUid: uids
                        }).then(() => {
                            firebase.database().ref().child(`postData/${price.key}/Bind`).push({
                                bidName: price.Name,
                                bidPrice: price.lastestPrice,
                                bidUid: uids
                            })
                        })

                    } else {
                        alert('Please Give Price Greater then Highest Bid')
                    }
                } else {

                    firebase.database().ref().child(`postData/${price.key}`).update({
                        bidName: price.Name,
                        bidPrice: price.lastestPrice,
                        bidUid: uids
                    }).then(() => {
                        firebase.database().ref().child(`postData/${price.key}/Bind`).push({
                            bidName: price.Name,
                            bidPrice: price.lastestPrice,
                            bidUid: uids
                        })
                    })

                }
            } else {
                alert('Your Bid is Less then Current Price')
            }
            // })
        }
    }
    static update(post) {
        return (dispatch) => {
            if (post.image) {
                firebase.storage().ref(`image/${post.image.name}`).put(post.image).then(function (user) {
                    firebase.storage().ref(`image/${post.image.name}`).getDownloadURL().then(function (url) {
                        firebase.database().ref().child(`postData/${post.key}`).update({
                            Name: post.Name,
                            image: url,
                            Category: post.Category,
                            imgname: post.image.name
                        })
                    })
                })
            }
            else {
                firebase.database().ref().child(`postData/${post.key}`).update({
                    Name: post.Name,
                    Category: post.Category,
                })
            }
        }
    }
    static Purchase(key) {
        return (dispatch) => {
            firebase.database().ref().child(`postData/${key}`).on('value',(snap)=>{
                let data = snap.val()
                console.log(data)
                firebase.database().ref().child(`Users/${data.uids}/Post`).push({
                    data
                })
                firebase.database().ref().child(`Users/${data.bidUid}/Purchase`).push({
                    data
                })
            })
                firebase.database().ref().child(`postData/${key}`).remove()
                this.getPost()
                
            }  
        }
    static deletePost(key) {
        return (dispatch) => {
            firebase.database().ref().child(`postData/${key}`).on('value',(snap)=>{
                let data = snap.val()
                console.log(data)
                firebase.database().ref().child(`Users/${data.uids}/Post`).push({
                    data
                })
            })
                firebase.database().ref().child(`postData/${key}`).remove()
           
        }
    }
    static dltpost(key) {
        return(dispatch) =>{
            firebase.database().ref().child(`postData/${key}`).remove().then(()=>{

                firebase.database().ref().child(`postData/`).on('value', (snap) => {
                    if (snap.val()) {
                        dispatch(storeAction.post(snap.val()))
                    }else{
                        dispatch(storeAction.delete())
                    }
                })
            })
        }
    }
    static hisData(myuid) {
        return(dispatch) =>{
            firebase.database().ref().child(`Users/${myuid}`).on('value',(snap)=>{
                let data = snap.val()
                console.log(data)
                dispatch(storeAction.get(snap.val()))
            })
        }
    }
}