import React from 'react';
import './style/video_detail.css'

export default function VideoDetail({ video }) {

  if(!video) {
    return (
      <div>...Loading</div>
    );
  } 
   
  //const {snippet:{title, thumbnails:{default:{url}}}} = video;
    const {
    snippet: { title, description }, id: { videoId }
  } = video;  
       
    
  const url = `https://youtube.com/embed/${videoId}`;
           
  return (
    
    <div className="video-detail">
       <iframe title="videoDetail" width="560" height="349" className="videoPlay" src={url}frameBorder="0" allowFullScreen alt="videoPlay"></iframe>
       <p><strong>{title}</strong></p>
        <p>{description}</p>
     </div>
    
    
  );
};