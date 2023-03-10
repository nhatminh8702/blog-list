import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./component/List.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/blog" element={<List />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
