import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Store/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
      primary1Color: '#4642b6',
      accent1Color: '#4642b6',
  },
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
<Provider store={store}>
  <div>
    <App />
  </div>
</Provider> 
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
