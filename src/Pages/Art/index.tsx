import React from "react";
import Cards from "Components/Cards";

import { art } from "copy";

const Art = () => {
  return (
    <div id="art">
      <Cards images={art} />
    </div>
  );
};

export default Art;
