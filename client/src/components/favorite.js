import React, { Component } from "react";
import VideoList from './video_list';
import VideoDetail from './video_detail';
import { connect } from 'react-redux';
import * as actions from '../actions';


 
class FAVIDEOS extends Component {
  componentWillMount() {
    this.props.requestFvideos()
  }
  render()  {

    const {videos, selectedFvideo} = this.props;
    if (!videos || !selectedFvideo) {
      return (
        <div>....Loading</div>
      )
    } 
    
    return (
      <div>
        <section className="main">
            <p>THis is for fav videos</p>
            <VideoDetail video={selectedFvideo} />
            <VideoList videos={videos} />
        </section>     
      </div>
    );
  }
}
 
function mapStateToProps(state) {
  
  return {
    videos: state.video.videos,
    selectedFvideo: state.video.selectedFvideo
  };
}



export default connect(mapStateToProps, actions)(FAVIDEOS);