import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/Home/Homepage';
import signuppage from './components/Signup/signuppage';

export default (
    <Route path = "/" component={ App }>
        <IndexRoute component= { HomePage } />
        <Route path="signup" component ={signuppage}/>
    </Route>
);