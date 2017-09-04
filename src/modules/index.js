import { combineReducers } from 'redux';

import adminLogin from 'modules/reducers/adminLogin'

const initialSome = {
  currentLanguage: "en",
  languages: [],
  currentLocation: "Jamaica",
  locations: [],
  navigation: [],
  currentPage: "Home",
};

function initialReducer(state = initialSome, action) {
  return state
}
export default combineReducers({
  initialReducer,
  adminLogin
});
