import React, { useEffect } from "react";
import Plane from "Components/Thumbnail/plane";
import { Art } from "static/img";

const Thumbnail = () => {
  useEffect(() => {
    new Plane(Art);
  }, []);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }} id="thumbnail"></div>
    </>
  );
};

export default Thumbnail;
