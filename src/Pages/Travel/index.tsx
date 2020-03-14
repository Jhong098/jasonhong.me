import React from "react";
import Cards from "Components/Cards";

import { hk1, hk2, hk3, hk4, hk5, hk6 } from "static";

const Travel = () => {
  return (
    <div>
      <Cards images={[hk1, hk2, hk3, hk4, hk5, hk6]} />
    </div>
  );
};

export default Travel;
