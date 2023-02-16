import React, { Component } from "react";
import MainDashboard from "./containers/MainDashboard/MainDashboard";
import TitleBar from "./containers/TitleBar/TitleBar";
import Footer from "./containers/Footer/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TitleBar />
        <MainDashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
