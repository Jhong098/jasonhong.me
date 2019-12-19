// import React, { useState } from "react";
// import "./Landing.scss";
// import { Art, Me, Temple } from "static/img";
// import SectionImage from "Components/SectionImage";
// import { Redirect } from "react-router-dom";

// const Landing = () => {
//   const [redirectTo, setRedirectTo] = useState("");
//   return (
//     <>
//       <main>
//         <div data-scroll className="page">
//           <div className="content content--center">
//             <SectionImage
//               image={Me}
//               titleText="Me"
//               description="about me."
//               onClick={() => {
//                 setRedirectTo("about");
//               }}
//             />
//             <SectionImage
//               image={Art}
//               titleText="Art"
//               description="about my art."
//               onClick={() => {
//                 setRedirectTo("art");
//               }}
//             />
//             <SectionImage
//               image={Temple}
//               titleText="Travel"
//               description="about my travels."
//               onClick={() => {
//                 setRedirectTo("travel");
//               }}
//             />
//           </div>
//         </div>
//       </main>
//       {redirectTo === "about" && <Redirect to="/about" />}
//     </>
//   );
// };

// export default Landing;
import React, { Suspense, useEffect, useRef, useMemo } from "react";
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber";
import { TextureLoader, LinearFilter } from "three";
import lerp from "lerp";
import { Text, MultilineText } from "Components/Text";
import Plane from "Components/Plane";
import { Block, useBlock } from "Components/Block";
import { a } from "@react-spring/three";
import { a as aDom } from "@react-spring/web";
import state from "copy";
import "./Landing.scss";
import useYScroll from "../../utils/useYScroll";

function Startup() {
  const ref = useRef();
  useFrame(
    () =>
      (ref.current.material.opacity = lerp(
        ref.current.material.opacity,
        0,
        0.025
      ))
  );
  return (
    <Plane
      ref={ref}
      color="#0e0e0f"
      position={[0, 0, 200]}
      scale={[100, 100, 1]}
    />
  );
}

const Paragraph = ({
  image,
  index,
  offset,
  factor,
  header,
  aspect,
  text,
  y
}) => {
  console.log(offset);
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock();
  const size = aspect < 1 && !mobile ? 0.65 : 1;
  const alignRight = (canvasWidth - w * size - margin) / 2;
  const pixelWidth = w * state.zoom * size;
  const left = !(index % 2);
  const color = index % 2 ? "#D40749" : "#2FE8C3";
  return (
    <Block factor={factor} offset={offset - 1} y={y}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane
          map={image}
          args={[1, 1, 32, 32]}
          shift={75}
          size={size}
          aspect={aspect}
          scale={[w * size, (w * size) / aspect, 1]}
          frustumCulled={false}
        />
        <Dom
          style={{
            width: pixelWidth / (mobile ? 1 : 2),
            textAlign: left ? "left" : "right"
          }}
          position={[
            left || mobile ? (-w * size) / 2 : 0,
            (-w * size) / 2 / aspect - 0.4,
            1
          ]}
        >
          <div tabIndex={index}>{text}</div>
        </Dom>
        <Text
          left={left}
          right={!left}
          size={w * 0.04}
          color={color}
          top
          position={[
            ((left ? -w : w) * size) / 2,
            (w * size) / aspect / 2 + 0.5,
            -1
          ]}
        >
          {header}
        </Text>
        <Block factor={0.2}>
          <Text
            opacity={0.5}
            size={w * 0.1}
            color="#1A1E2A"
            position={[
              ((left ? w : -w) / 2) * size,
              (w * size) / aspect / 1.5,
              -10
            ]}
          >
            {"0" + (index + 1)}
          </Text>
        </Block>
      </group>
    </Block>
  );
};

function Content({ y }) {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  );
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [
    images
  ]);
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock();
  return (
    <>
      {/* <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text
            left
            size={w * 0.08}
            position={[-w / 3.2, 0.5, -1]}
            color="#d40749"
          >
            hong.json
          </Text>
        </Block>
        <Block factor={1.0}>
          <Dom position={[-w / 3.2, -w * 0.08, -1]}>
            It was the year 2076.{mobile ? <br /> : " "}The substance had
            arrived.
          </Dom>
        </Block>
      </Block> */}
      {state.paragraphs.map((props, index) => (
        <Paragraph
          key={index}
          index={index}
          {...props}
          y={y}
          image={images[index]}
        />
      ))}
      {/* {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane
            args={[50, height, 32, 32]}
            shift={-4}
            color={color}
            rotation={[0, 0, Math.PI / 8]}
            position={[0, 0, -10]}
          />
        </Block>
      ))} */}
      <Block factor={1.25} offset={8}>
        <Dom
          className="bottom-left"
          position={[-canvasWidth / 2, -canvasHeight / 2, 0]}
        >
          Culture is not your friend.
        </Dom>
      </Block>
    </>
  );
}

function Landing() {
  const [y] = useYScroll([-100, 2400], { domTarget: window });
  console.log(y);
  // const scrollArea = useRef();
  // const onScroll = e => (state.top.current = e.target.scrollTop);
  // useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        // className="canvas"
        concurrent
        pixelRatio={1}
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        <Suspense
          fallback={<Dom center className="loading" children="Loading..." />}
        >
          <Content y={y} />
          <Startup />
        </Suspense>
      </Canvas>
      {/* <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div
            key={index}
            id={"0" + index}
            style={{ height: `${(state.pages / state.sections) * 100}vh` }}
          />
        ))}
      </div> */}
    </>
  );
}

export default Landing;
