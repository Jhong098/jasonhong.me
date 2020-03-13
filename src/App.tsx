import React from "react";

import Logo from "Components/Logo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import "./App.scss";
import Landing from "Pages/Landing";
import Links from "Components/Links";
import Experiences from "Pages/Experiences";
import ExperienceDetails from "Pages/Experiences/ExperienceDetails";
import { AnimatePresence } from "framer-motion";

const App = () => {
  // const location = useLocation();
  return (
    <div className="App">
      {/* <canvas id="cursor" style={{ height: "100%", width: "100%" }} /> */}
      <Links />
      <Router>
        {/* <AnimatePresence> */}
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/experience">
            <Experiences />
          </Route>
          <Route path="/experience/:number">
            <ExperienceDetails />
          </Route>
        </Switch>
        {/* </AnimatePresence> */}
        <Logo />
      </Router>
    </div>
  );
};

export default App;
