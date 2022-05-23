import {combineReducers} from 'redux';
import {users} from './persons';
const rootReducer = combineReducers({
  users,
});
export default rootReducer;
