import React, { useEffect } from "react";
import { init } from "Components/Scroller/scroller";
import "./Scroller.scss";
import { Art, Me, Temple } from "static/img";

const Scroller = () => {
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="slider | js-drag-area">
        <div className="slider__inner | js-slider">
          <div className="slide | js-slide">
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src={Art}
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "120%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src={Me}
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "240%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src={Temple}
                alt=""
                draggable={false}
              />
            </div>
          </div>
          {/* <div className="slide | js-slide" style={{ left: "360%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg"
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "480%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg"
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "600%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src="http://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg"
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "720%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex1.jpg"
                alt=""
                draggable={false}
              />
            </div>
          </div>
          <div className="slide | js-slide" style={{ left: "840%" }}>
            <div className="slide__inner | js-slide__inner">
              <img
                className="js-slide__img"
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/tex2.jpg"
                alt=""
                draggable={false}
              />
            </div>
          </div> */}
        </div>
      </div>

      <div className="titles">
        <div className="titles__title titles__title--proxy">Lorem ipsum</div>
        <div className="titles__list | js-titles">
          <div className="titles__title | js-title">Moonrocket</div>
          <div className="titles__title | js-title">Spaceman</div>
          <div className="titles__title | js-title">Moonrocket</div>
          {/* <div className="titles__title | js-title">Spaceman</div>
          <div className="titles__title | js-title">Moonrocket</div>
          <div className="titles__title | js-title">Spaceman</div>
          <div className="titles__title | js-title">Moonrocket</div>
          <div className="titles__title | js-title">Spaceman</div>
          <div className="titles__title | js-title">Moonrocket</div> */}
        </div>
      </div>

      <div className="progress">
        <div className="progress__line | js-progress-line"></div>
        <div className="progress__line | js-progress-line-2"></div>
      </div>
    </>
  );
};

export default Scroller;
