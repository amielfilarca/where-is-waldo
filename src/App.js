import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import raidthree from "./data/raidthree";
import { db } from "./firebase";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: raidthree,
      timerIsRunning: false,
      time: null,
      form: true,
      playerName: null,
      highScores: [],
    };
  }

  markFound = (id) => {
    const newData = this.state.data.map((data) => {
      if (data.id === id) {
        data.found = true;
      }
      return data;
    });

    this.setState({
      data: newData,
    });
  };

  stopTimer = () => {
    this.setState({
      timerIsRunning: false,
    });
  };

  setTime = (time) => {
    this.setState({
      time,
    });
  };

  closeForm = () => {
    if (this.state.playerName) {
      this.setState({
        form: false,
      });
      setTimeout(() => {
        this.setState({
          timerIsRunning: true,
        });
      }, 1000);
    }
  };

  validateTextField = (e) => {
    if (
      e.target.value.trim() !== "" &&
      e.target.value !== null &&
      e.target.value.trim().length < 32
    ) {
      this.setState({
        playerName: e.target.value.trim(),
      });
    } else {
      this.setState({
        playerName: null,
      });
    }
  };

  saveData = () => {
    db.collection("scores")
      .add({
        player: this.state.playerName,
        time: this.state.time,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  getData = () => {
    let dbScores = [];

    db.collection("scores")
      .orderBy("time", "asc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          dbScores.push(doc.data());
        });
      });

    this.setState({
      highScores: dbScores,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          data={this.state.data}
          markFound={this.markFound}
          timerIsRunning={this.state.timerIsRunning}
          stopTimer={this.stopTimer}
          setTime={this.setTime}
          form={this.state.form}
          playerName={this.state.playerName}
          closeForm={this.closeForm}
          validateTextField={this.validateTextField}
          time={this.state.time}
          saveData={this.saveData}
          highScores={this.state.highScores}
        />
      </div>
    );
  }
}

export default App;
