import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './Components/Firebase/firebase';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#4B0082',
        accent1Color: '#4B0082',
    },
  });
  

ReactDOM.render(<MuiThemeProvider muiTheme={muiTheme}><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();


// function hello(abc){
//     firebase.database().ref(`Users/${user.uid}`).on("value", (snapshot) => {
//         let data = snapshot.val();
//         abc(data)
              
//       })
      
      
    
// }

// export {
//     hello,
//     xyz,
//     abc
// }

// hello(function (data){
//     this.setState({
//         currentuserName : data.name,
//         condition: true
//       })
//       this.setState({open: !this.state.open})
// })
