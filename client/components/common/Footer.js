import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

const Footer = () => {
    return (
        <footer className="page-footer green darken-4">
            <div className="container green darken-4">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Stay Connected</h5>
                        <p className="grey-text text-lighten-4">Join our over 5 million users today.
                        </p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        {/* <!--
                    <h5 className="white-text">Sign Up</h5>
                    <h5 className="white-text">Sign In</h5>
    --> */}
                        <ul className='social-icon'>
                            <li>
                                <a href="http://twitter.com/postitapp"><img src={require("../../../template/images/twitter-wrap.png")} alt="Twitter Logo" className=" grey-text text-lighten-4 right social-icon"/></a>
                            </li>
                            <li>
                                <a href="http://facebook.com/postitapp"><img src={require("../../../template/images/facebook-wrap.png")} alt="Facebook Logo" className=" grey-text text-lighten-4 right social-icon"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright green darken-4 ">
                <div className="container green darken-4">
                    © 2017 Happy Girl World
                    {/* <!--            <a className="grey-text text-lighten-4 right" href="#!">More Links</a>--> */}
                </div>
            </div>
        </footer>

    );
};


export default Footer;