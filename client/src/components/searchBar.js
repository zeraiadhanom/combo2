import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './style/searchBar.css'

class SearchBar extends Component {

  onInputChange(term) {
     (this.props.requestVideos(term));
  }

  render() {
    return (
        <div className="search">
            <input placeholder="Enter text to search for videos!" onChange={event => this.onInputChange(event.target.value)} />
        </div>
    );
}
}

export default connect(null, actions)(SearchBar);