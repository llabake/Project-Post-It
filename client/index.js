import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory }  from 'react-router';
import routes from './routes';
import '../node_modules/material-ui/FlatButton/FlatButton';

import '../node_modules/material-ui/'

render(
    <Router history={ browserHistory } routes={routes} />,
    document.getElementById('app')
);
