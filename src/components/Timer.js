import React, { Component } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import { toDate, format, differenceInMilliseconds } from "date-fns";

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      timeElapsed: "00:00:00",
    };
  }

  componentDidMount() {
    const checkForTimer = setInterval(() => {
      if (this.props.timerIsRunning) {
        clearInterval(checkForTimer);
        this.setState({
          startTime: toDate(new Date()),
        });
        const timer = setInterval(() => {
          this.setState({
            timeElapsed: format(
              differenceInMilliseconds(new Date(), this.state.startTime),
              "mm:ss:SS"
            ),
          });
          if (!this.props.timerIsRunning) {
            clearInterval(timer);
            this.props.setTime(this.state.timeElapsed);
            this.props.saveData();
          }
        }, 1);
      }
    }, 1);
  }

  render() {
    return <ListItemText primary={this.state.timeElapsed} />;
  }
}

export default Timer;
