import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/Auth"
import { reducer as homeReducer } from "../modules/Home"
import { reducer as searchReducer } from '../modules/Search'

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, homeReducer, searchReducer });

export default rootReducer;