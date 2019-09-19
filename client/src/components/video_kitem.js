
import React, {Component} from 'react';
import './style/video_item.css'
import * as actions from '../actions'
import  {connect} from 'react-redux';

class VideoKitem extends Component {
  
    render() {
      const {video, selectKvideo} = this.props;
      const {snippet:{title, thumbnails:{default:{url}}}} = video;
     
      return(
        <div onClick={ () => selectKvideo(video)} className="video-item">
         <img className='video-image' src={url} alt={video.snippet.description}/>
           <div className='content'>
             <div className='header'>{title}</div>
          </div>
        </div>
      )
    }
  }
  export default connect(null, actions)(VideoKitem)