import React, {Component} from 'react';
import './style/video_item.css'
import * as actions from '../actions'
import  {connect} from 'react-redux';

class VideoItem extends Component {
  render() {
      const { video, selectVideo} = this.props;  
      const {snippet:{title, thumbnails:{default:{url}}}} = video;
      

    return (
       <div onClick={ () => selectVideo(video)} className="video-item" >
            <img className='video-image' src={url} alt={video.snippet.description}/>
        <div className='content'> 
            <div className='header'>{title}</div>
         </div> 
       </div>    
    )
  }
}

class VideoFitem extends Component {
  render() {
    const {video, selectFvideo} = this.props;
    const {snippet:{title, thumbnails:{default:{url}}}} = video;
    
    return(
      <div onClick={ () => selectFvideo(video)} className="video-item">
       <img className='video-image' src={url} alt={video.snippet.description}/>
         <div className='content'>
           <div className='header'>{title}</div>
        </div>
      </div>
    )
  }
} 

export default connect(null, actions)(VideoItem)