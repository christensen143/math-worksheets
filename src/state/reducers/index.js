import navigation from './navigation';
import questions from './questions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  navigation,
  questions,
});

export default rootReducer;
