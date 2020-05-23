import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/Auth"
import { reducer as homeReducer } from "../modules/Home"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer });

export default rootReducer;