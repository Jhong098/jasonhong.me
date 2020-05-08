import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import Landing from "Pages/Landing";
import Travel from "Pages/Travel";
import Art from "Pages/Art";
import Background from "Components/Background";

import "normalize.css";

const App = () => {
  return (
    <div className="App">
      <Background />
      {/* <canvas id="cursor" style={{ height: "100%", width: "100%" }} /> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/travel">
            <Travel />
          </Route>
          <Route exact path="/art">
            <Art />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
