import React from "react";
import About from "Pages/About";
import Cursor from "Components/Cursor";
import Logo from "Components/Logo";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Thumbnail from "Components/Thumbnail";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Thumbnail />
          </Route>
        </Switch>
      </Router>
      <Logo />
      <Cursor />
    </div>
  );
};

export default App;
