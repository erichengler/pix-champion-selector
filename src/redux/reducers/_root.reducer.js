import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import champions from './champions.reducer'
import thisChampion from './thisChampion.reducer';
import result from './result.reducer';
import favorites from './favorites.reducer';
import filteredChampions from './filteredChampions.reducer';
import blacklist from './blacklist.reducer';
import notes from './notes.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  champions,
  thisChampion,
  filteredChampions,
  favorites,
  notes,
  blacklist,
  result,
});

export default rootReducer;
