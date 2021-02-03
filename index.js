import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";//!!!
import { Presentational } from "./3. react-redux-files/reactStuff";
import {
  store
  , mapStateToProps
  , mapDispatchToProps
} from "./3. react-redux-files/reduxStuff";
import "./2. style/index.scss";

const Container = 
connect(mapStateToProps, mapDispatchToProps)(Presentational);

const Wrapper = () => (
  <Provider store={store}>
    <Container/>
  </Provider>
);

ReactDOM.render(<Wrapper/>, document.getElementById("root"));