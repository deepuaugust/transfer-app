import React, { Component } from "react";
import injectSheet from "react-jss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styles from "./App.style.js";
import WeatherDetails from "./components/weatherDetails";

/**
 * @description - Render the App class.
 * @returns {Node} - HTML code.
 */
class App extends Component {
  render() {
    return (
      <Router basename="/home">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <WeatherDetails />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default injectSheet(styles)(App);
