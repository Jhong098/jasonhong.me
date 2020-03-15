import React from "react";
import Cards from "Components/Cards";

import { travel } from "copy";

const Travel = () => {
  return (
    <div id="travel">
      <Cards images={travel} />
    </div>
  );
};

export default Travel;
