import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper green darken-4">
                <a href="index.html" className="brand-logo">Post It</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li> <IndexLink to="/">Sign Up</IndexLink> </li>
                    <li> <Link to="/signin">Sign In</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;