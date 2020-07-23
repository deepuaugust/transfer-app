import React, { Component, Fragment } from "react";
import injectSheet from "react-jss";
import styles from "./App.style.js";
import TransferComponent from "./components/transferComponent";

/**
 * @description - Render the App class.
 * @returns {Node} - HTML code.
 */
class App extends Component {
  render() {
    // Sample data passed to transfer component.
    let data = [
      {
        id: 1,
        value: "Option 1",
      },
      {
        id: 2,
        value: "Option 2",
      },
      {
        id: 3,
        value: "Option 3",
      },
      {
        id: 4,
        value: "Option 4",
      },
      {
        id: 5,
        value: "Option 5",
      },
      {
        id: 6,
        value: "Option 6",
      },
      {
        id: 7,
        value: "Option 7",
      },
      {
        id: 8,
        value: "Option 8",
      },
      {
        id: 9,
        value: "Option 9",
      },
      {
        id: 10,
        value: "Option 10",
      },
    ];
    return (
      <Fragment>
        <TransferComponent data={data} />
      </Fragment>
    );
  }
}

export default injectSheet(styles)(App);
