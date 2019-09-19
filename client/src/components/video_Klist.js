import React from 'react'
import './style/video_list.css'
import VideoKitem from './video_kitem'


 export default function VideoKlist ({videos}) {
      const videosKlist = videos.map(video => 
        <VideoKitem key={video.etag} video={video} />
      )

      return (
        <section className="video-List" >
             {videosKlist}
        </section>
      )
    }