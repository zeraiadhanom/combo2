import React from 'react';
import './style/Home.css';
import KidsVideo from '../components/KidsVideo';
import WATCH from '../components/Watch'
import FAVIDEOS from '../components/favorite'
import {BrowserRouter as Router, Route, Link, HashRouter} from 'react-router-dom';


export default class Home extends React.Component {
   
    render() {
        return (
            <HashRouter>
       <div className="App">
         <header className="App-header">
             <div className="menu">
               <ul className="nav">
                  <li><Link to="/Home">Home</Link></li> 
                  <li><Link to="/KidsVideo">Kids</Link></li>
                  <li><Link to="/Watch">Watch</Link></li>
                  <li><Link to="/FAVIDEOS">Favorite Videos</Link> </li>   
                 </ul>
                   {this.props.children}
               </div>
           </header>
           <div className="main">
               <Route path="/KidsVideo" component={KidsVideo}/>
               <Route path="/watch" component={WATCH}/>
               <Route path="/FAVIDEOS" component={FAVIDEOS}/>
               
           </div>
         </div>
       </HashRouter>
        );
    }
}
/*function mapStateToProps(state) {
  
}



export default connect(mapStateToProps, actions)(Home);*/