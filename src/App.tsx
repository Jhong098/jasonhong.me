import React from "react";
import About from "Pages/About";
// import "Components/Cursor/index.js";
import Logo from "Components/Logo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
// import Thumbnail from "Components/Thumbnail";
import Landing from "Pages/Landing";

const App: React.FC = () => {
  return (
    <div className="App">
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
