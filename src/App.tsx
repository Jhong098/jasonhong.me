import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "Pages/Landing";
import NotFound from "Pages/404";
import Background from "Components/Background";

import "normalize.css";
import "./App.scss";
import Loader from "Components/Loader";

const Travel = lazy(() => import("Pages/Travel"));
const Art = lazy(() => import("Pages/Art"));

const App = () => {
  return (
    <div className="App">
      <Background />
      <Router>
        <Suspense fallback={<Loader />}>
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
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
