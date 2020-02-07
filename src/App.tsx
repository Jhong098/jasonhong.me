import React from "react";
import About from "Pages/About";
import Logo from "Components/Logo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
// import Thumbnail from "Components/Thumbnail";
import Landing from "Pages/Landing";
import Links from "Components/Links";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <canvas id="cursor" style={{ height: "100%", width: "100%" }} /> */}
      <Links />
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
        <Logo />
      </Router>
    </div>
  );
};

export default App;
