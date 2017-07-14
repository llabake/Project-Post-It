import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory }  from 'react-router';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom'

// import '../node_modules/material-ui/FlatButton/FlatButton';
// import '../node_modules/materialize-css/dist/css/materialize';


render(
    <Router history={ browserHistory } routes={routes} />,
    document.getElementById('app')
);
// render((
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>),
//     document.getElementById('app')
// );
