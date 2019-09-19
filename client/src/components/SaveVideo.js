import React, { Component } from "react";

import { connect } from 'react-redux';
import * as actions from '../actions';
import './style/SaveVideo.css' ;


 
class SaveVideo extends Component {
  componentWillMount() {
  // this.props.addSvideos()
  
  }
  render()  {
    //const {selectedVideo} = this.props;
    return (
      <div>
        <section className="save">
           
           
            <button onClick={() => this.SaveVideo()}>Save</button>
        </section>  
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  
  return {
   // videos: state.video.videos,
    selectedVideo: state.video.selectedVideo
  };
}



export default connect(mapStateToProps, actions)(SaveVideo);