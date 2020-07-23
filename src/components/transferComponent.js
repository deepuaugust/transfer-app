import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import styles from "./transferComponent.style.js";
import * as _ from "lodash";

/**
 * @description - Renders the transfer component.
 * @returns {Node} - Returns html.
 */
class TransferComponent extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {
      leftOptionsSelected: [],
      leftOptions: props.data.map((item) => ({
        id: item.id,
        value: item.value,
        checked: false,
      })),
      rightOptionsSelected: [],
      rightOptions: [],
    };
  }

  /**
   * @description - On change function called when options in right div is selected.
   * @param {Object} e - Event object.
   */
  handleChangeRight = (e) => {
    const { rightOptions } = this.state;
    let data = rightOptions.filter(
      (item) => item.id === Number(e.target.value)
    );
    if (data.length !== 0) data[0].checked = !data[0].checked;
    this.setState(
      {
        rightOptions,
      },
      this.addToSelectedRight
    );
  };

  /**
   * @description - Function called once set state is completed to create array with selected options in the right div.
   */
  addToSelectedRight = () => {
    const { rightOptions } = this.state;
    const selectedOptions = rightOptions
      .filter((item) => item.checked === true)
      .map((val) => ({
        id: val.id,
        value: val.value,
        checked: false,
      }));
    this.setState({
      rightOptionsSelected: selectedOptions,
    });
  };

  /**
   * @description - Function that moves items from right to left div.
   */
  handleSelectedValuesRight = () => {
    const { rightOptionsSelected, rightOptions, leftOptions } = this.state;
    const difference = _.differenceBy(rightOptions, rightOptionsSelected, "id");
    this.setState(
      {
        leftOptions: [...leftOptions, ...rightOptionsSelected],
        rightOptions: difference,
      },
      () => {
        this.setState({
          rightOptionsSelected: [],
        });
      }
    );
  };

  /**
   * @description - On change function called when options in left div is selected.
   * @param {Object} e - Event object.
   */
  handleChangeLeft = (e) => {
    const { leftOptions } = this.state;
    let data = leftOptions.filter((item) => item.id === Number(e.target.value));
    if (data.length !== 0) data[0].checked = !data[0].checked;
    this.setState(
      {
        leftOptions,
      },
      this.addToSelectedLeft
    );
  };

  /**
   * @description - Function called once set state is completed to create array with selected options in the left div.
   */
  addToSelectedLeft = () => {
    const { leftOptions } = this.state;
    const selectedOptions = leftOptions
      .filter((item) => item.checked === true)
      .map((val) => ({
        id: val.id,
        value: val.value,
        checked: false,
      }));
    this.setState({
      leftOptionsSelected: selectedOptions,
    });
  };

  /**
   * @description - Function that moves items from left to right div.
   */
  handleSelectedValuesLeft = () => {
    const { leftOptionsSelected, leftOptions, rightOptions } = this.state;
    const difference = _.differenceBy(leftOptions, leftOptionsSelected, "id");
    this.setState(
      {
        rightOptions: [...rightOptions, ...leftOptionsSelected],
        leftOptions: difference,
      },
      () => {
        this.setState({
          leftOptionsSelected: [],
        });
      }
    );
  };

  /**
   * @description - Function that moves selected items an index above.
   */
  moveItemsUp = () => {
    const { rightOptions, rightOptionsSelected } = this.state;
    for (let i = 0; i < rightOptionsSelected.length; i++) {
      const data = _.findIndex(rightOptions, {
        id: rightOptionsSelected[i].id,
      });
      if (data - 1 < 0) {
        alert(
          "Selected values are already present at the top. Please try again with different selections."
        );
        break;
      }
      let value = rightOptions[data - 1];
      rightOptions[data - 1] = {
        id: rightOptionsSelected[i].id,
        value: rightOptionsSelected[i].value,
        checked: !rightOptionsSelected[i].checked,
      };
      rightOptions[data] = value;
    }
    this.setState({
      rightOptions,
    });
  };

  /**
   * @description - Function that moves selected items an index below.
   */
  moveItemsDown = () => {
    const { rightOptions, rightOptionsSelected } = this.state;
    for (let i = rightOptionsSelected.length - 1; i >= 0; i--) {
      const data = _.findIndex(rightOptions, {
        id: rightOptionsSelected[i].id,
      });
      if (data + 1 > rightOptions.length - 1) {
        alert(
          "Selected values are already present at the bottom. Please try again with different selections."
        );
        break;
      }
      let value = rightOptions[data + 1];
      rightOptions[data + 1] = {
        id: rightOptionsSelected[i].id,
        value: rightOptionsSelected[i].value,
        checked: !rightOptionsSelected[i].checked,
      };
      rightOptions[data] = value;
    }
    this.setState({
      rightOptions,
    });
  };

  /**
   * @description - Renders the left div.
   * @returns {Node} - Returns html for left div.
   */
  renderLeftDiv = () => {
    const { classes } = this.props;
    const { leftOptions } = this.state;
    return (
      <Fragment>
        <div className={classes.leftDiv}>
          <h2>Select Required Items</h2>
          {leftOptions.map((item, index) => (
            <div key={index} className={classes.optionDiv}>
              <input
                type="checkbox"
                name="leftoption"
                checked={item.checked}
                value={item.id}
                onChange={this.handleChangeLeft}
              />
              <label className={classes.labelStyle} htmlFor="leftoption">
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the button div.
   * @returns {Node} - Returns html for button div.
   */
  renderButtonDiv = () => {
    const { classes } = this.props;
    const { leftOptions, rightOptions } = this.state;
    return (
      <Fragment>
        <div className={classes.buttonDiv}>
          <button
            type="button"
            className={classes.btnStyles}
            onClick={this.handleSelectedValuesRight}
            disabled={rightOptions.length === 0 ? true : false}
            value="Deselect"
          >
            Deselect
          </button>
          <button
            type="button"
            className={classes.btnStyles}
            onClick={this.handleSelectedValuesLeft}
            disabled={leftOptions.length === 0 ? true : false}
            value="Select"
          >
            Select
          </button>
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the right div.
   * @returns {Node} - Returns html for right div.
   */
  renderRightDiv = () => {
    const { classes } = this.props;
    const { rightOptions } = this.state;
    return (
      <Fragment>
        <div className={classes.rightDiv}>
          <h2>Selected Items</h2>
          <div className={classes.moveDiv}>
            <button
              type="button"
              className={classes.btnStyles}
              onClick={this.moveItemsUp}
              disabled={rightOptions.length === 0 ? true : false}
              value="Moveup"
            >
              Move Up
            </button>
            <button
              type="button"
              className={classes.btnStyles}
              onClick={this.moveItemsDown}
              disabled={rightOptions.length === 0 ? true : false}
              value="Movedown"
            >
              Move Down
            </button>
          </div>
          {rightOptions.map((item, index) => (
            <div key={index} className={classes.optionDiv}>
              <input
                type="checkbox"
                name="rightoption"
                checked={item.checked}
                value={item.id}
                onChange={this.handleChangeRight}
              />
              <label className={classes.labelStyle} htmlFor="rightoption">
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the transfer component.
   * @returns {Node} - Returns html.
   */
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.flexDiv}>
          {this.renderLeftDiv()}
          {this.renderButtonDiv()}
          {this.renderRightDiv()}
        </div>
      </Fragment>
    );
  }
}

TransferComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.array.isRequired,
};

TransferComponent.defaultProps = {};

export default injectSheet(styles)(TransferComponent);
