import React from "react";
import Landing from "Pages/Landing";
import Cursor from "Components/Cursor";
import Logo from "Components/Logo";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Logo />
      <Landing />
      <Cursor />
    </div>
  );
};

export default App;
