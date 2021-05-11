import React from "react";
import Home from "./views/pages/Home";
import store from "./store/store";
import { Provider } from "react-redux";

// import { Container } from './styles';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
