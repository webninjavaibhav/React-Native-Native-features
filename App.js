import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import ReduxThunk from "redux-thunk";
import RootNavigation from "./navigation/Navigation";
import { init } from "./helpers/Db";

/**
 * Local database initilization
 */
init()
  .then(() => {
    console.log("Connected");
  })
  .catch(err => console.log("Connection fialed", err));

/**
 * Store created for redux
 */
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};

export default App;
