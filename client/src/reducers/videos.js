import { REQUEST_VIDEOS, SELECT_VIDEO,REQUEST_KVIDEOS, SELECT_KVIDEO, REQUEST_FVIDEOS, SELECT_FVIDEO, ADD_SVIDEO,SELECT_SVIDEO } from '../actions/actionType';


export default function(state = {}, action) {
  switch(action.type) {
    case REQUEST_VIDEOS:
      return { ...state, 
        selectedVideo: action.payload.selectedVideo, 
        videos: action.payload.videos
       };
    case SELECT_VIDEO:
      return { ...state, selectedVideo: action.payload };


    case REQUEST_KVIDEOS:
      return {
        selectedKvideo: action.payload.selectedKvideo, 
        videos: action.payload.videos
      };
    case SELECT_KVIDEO:
      return { ...state, selectedKvideo: action.payload };
    
    
      case REQUEST_FVIDEOS:
         
          return {
            selectedFvideo: action.payload.selectedFvideo, 
            videos: action.payload.videos
          };
        
     case SELECT_FVIDEO:     
        return { ...state, selectedFvideo: action.payload }; 

      
        case ADD_SVIDEO:
         
          return {
            selectedSVideo: action.payload.selectedSVideo, 
            videos: action.payload.videos
          };
        
     case SELECT_SVIDEO:     
        return { ...state, selectedSVideo: action.payload }; 
    }
    return state;
}

