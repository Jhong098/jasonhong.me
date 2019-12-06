import React from "react";
import Landing from "Pages/Landing";
import Cursor from "Components/Cursor";
import Logo from "Components/Logo";

import "./App.scss";
import Thumbnail from "Components/Thumbnail";

const App: React.FC = () => {
  return (
    <div className="App">
      <Logo />
      {/* <Thumbnail /> */}
      <Landing />
      <Cursor />
    </div>
  );
};

export default App;
