import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link, Redirect} from 'react-router-dom';
import './style/header.css'


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    

    render() {
        // Only render the log out button if we are logged in
    
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <Link to="/"><button className="header-bar"onClick={() => this.logOut()}>Log out</button></Link>     
            );   
        }
        return (
            <div className="header">
                {logOutButton}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
