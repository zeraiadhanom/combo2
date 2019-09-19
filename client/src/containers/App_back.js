import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import KidsVideo from '../components/KidsVideo';
import Home from '../components/Home';
import WATCH from '../components/Watch'
import FAVIDEOS from '../components/favorite'
import {BrowserRouter as Router, Route, Link, HashRouter} from 'react-router-dom';
import {refreshAuthToken} from '../actions/auth';
import HeaderBar from '../components/header-bar';
import LandingPage from '../components/landing-page';
import Dashboard from '../components/dashboard';
import RegistrationPage from '../components/registration-page';


import './App.css';

class App extends Component { 
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
}

componentWillUnmount() {
    this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 // One hour
    );
}

stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
}

  render() {
    return(
      <HashRouter>
       <div className="App">
         <header className="App-header">
             <div className="menu">
               <ul className="nav">
                  <li><Link to="/Home">Home</Link></li>
                  <li><Link to="/FAVIDEOS">Favorite Videos</Link> </li>  
                  <li><Link to="/KidsVideo">Kids</Link></li>
                  <li><Link to="/Watch">Watch</Link></li>
                 </ul>
                   {this.props.children}
               </div>
           </header>
           <div className="main">
               <Route exact path="/" component={LandingPage} />
               <Route exact path="/dashboard" component={Dashboard} />
               <Route exact path="/register" component={RegistrationPage} />
               <Route path="/Home" component={Home}/>
               <Route path="/KidsVideo" component={KidsVideo}/>
               <Route path="/watch" component={WATCH}/>
               <Route path="/FAVIDEOS" component={FAVIDEOS}/> 
           </div>
         </div>
       </HashRouter>
    )
}
}

function mapStateToProps(state) {
  
}



export default connect(mapStateToProps, actions)(App);

//check routhing example: https://medium.com/@khwsc1/step-by-step-guide-of-simple-routing-transition-effect-for-react-with-react-router-v4-and-9152db1566a0

//check Router sample; https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm
