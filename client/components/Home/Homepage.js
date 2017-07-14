import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
    render () {
        return (
            <div>
                <h1> Plural Sightk Admin</h1>
                <p> React, Redux router in esf or ultra responsive apps.</p>  
                <Link to="Signup" className="waves-effect waves-light btn"> Sign Up</Link>
            </div>
        );
    }
}

export default HomePage;