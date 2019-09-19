import { combineReducers } from 'redux';
import authReducer from '../reducers/auth';
import {reducer as formReducer} from 'redux-form';
import protectedDataReducer from '../reducers/protected-data';
import VideosReducer from './videos';

const rootReducer = combineReducers({
    
     video: VideosReducer,
     form: formReducer,
     auth: authReducer,
     protectedData: protectedDataReducer
 
});

export default rootReducer;