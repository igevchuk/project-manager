import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import Dialog from "@material-ui/core/Dialog";
import moment from "moment";
import styled from "styled-components";
import classnames from "classnames";
import "react-day-picker/lib/style.css";

const DatePickerComponent = styled.div`
  & .DayPicker {
    display: none;
    position: absolute;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    background: #ffffff;
    border-radius: 4px;
    z-index: 1;
  }
  & .DatePicker--Action {
    position: relative;
    display: inline-flex;
    width: 200px;
    margin: 10px 0;
    padding: 0 0 8px;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    color: #000000;
    border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    img {
      height: 20px;
    }
  }
`;

export default class Example extends React.Component {
  static defaultProps = {
    numberOfMonths: 1,
    month: moment().subtract("1", "year")
  };
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  componentWillReceiveProps(props) {
    if (props.pristine) {
      this.setState(this.getInitialState());
    }
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      open: false
    };
  }
  handleDayClick(day) {
    let range = DateUtils.addDayToRange(day, this.state);
    this.setState({ ...range, pristine: false });
  }
  getInitialMonth() {
    let initialDate = moment().subtract("1", "year");
    return new Date(initialDate);
  }
  getDisabledDays() {
    return {
      after: new Date()
    };
  }
  open() {
    this.setState({
      open: true
    });
  }
  close() {
    this.setState({
      open: false
    });
    let range = {
      from: this.state.from,
      to: this.state.to
    };
    this.props.onDaySelect(this.props.name, range);
  }

  getDate = timestamp => moment(timestamp).format("MMM D, YYYY");

  getSelectedLabel() {
    const { from, to } = this.state;
    let label = "Select Period";

    if(from && to) {
      label = `${this.getDate(from)} - ${this.getDate(to)}`;
    } else if (from && !to) {
      label = `After ${this.getDate(from)}`;
    }

    return label;
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <DatePickerComponent>
        <a className="DatePicker--Action" onClick={() => this.open()}>
          {this.getSelectedLabel()}
          <img src="src/assets/images/icons/menu-down.png" />
        </a>
        <Dialog onClose={() => this.close()} open={this.state.open}>
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            month={this.getInitialMonth()}
            disabledDays={this.getDisabledDays()}
          />
        </Dialog>
      </DatePickerComponent>
    );
  }
}
