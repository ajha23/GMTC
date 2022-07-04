import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import rootReducer from "./store/index";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import Toast from "./commons/UI/Toast/Toast"

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <Provider store={store}>
    <Toast />
      <Router>
        <App />
      </Router>
    </Provider>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
