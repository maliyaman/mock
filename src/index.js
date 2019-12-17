import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css"
import "alertifyjs/build/css/alertify.min.css"
import 'react-widgets/dist/css/react-widgets.css';

import {BrowserRouter} from 'react-router-dom';
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

import { Provider } from 'react-redux';
import configureStore from './redux/reducers/configureStore';


Moment.locale('en')
momentLocalizer()

const store = configureStore();

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
