import { createStore, combineReducers, applyMiddleware } from "redux";
import ProjectReducer from "./Project/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  project: ProjectReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
