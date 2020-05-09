import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useSpring } from "react-spring";
import LightBox from "Components/LightBox";
import { animated } from "react-spring";
import { ImageType } from "utils/types";

interface GridProps {
  images: ImageType[];
  handleLightBoxToggle: () => void;
}

const trans3 = (x: number, y: number) =>
  `translate3d(${x / 10}px,${y / 10}px,0)`;

const GridContainer = styled.div`
  padding: 80px 15vw 0;
  columns: 4 200px;
  column-gap: 1rem;
  img {
    width: 150px;
    background: #ec985a;
    color: white;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
  }
  @for $i from 1 through 36 {
    div:nth-child(#{$i}) {
      $h: (random(400) + 100) + px;
      height: $h;
      line-height: $h;
    }
  }
`;

const Image = styled.img`
  cursor: pointer;

  &:hover {
    filter: grayscale(100%) contrast(1) brightness(90%);
  }
`;

const ImageDesc = styled.h2`
  margin: 0;
  pointer-events: none;
`;

const GridView: React.FC<GridProps> = ({ images, handleLightBoxToggle }) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [openImage, setOpenImage] = useState("");

  const [transProps, setTransProps] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  const getRelMousePosition = (x: number, y: number, i: number) => {
    if (hovered !== i) return;
    const container = imageRefs.current[i]?.getBoundingClientRect();
    if (container) {
      setTransProps({ xy: [x - container.left, y - container.top] });
    }
  };

  return (
    <>
      {openImage && (
        <LightBox
          image={openImage}
          handleClose={() => {
            setOpenImage("");
            handleLightBoxToggle();
          }}
        />
      )}
      <GridContainer>
        {images.map(({ img, desc }, i) => (
          <div
            style={{ position: "relative" }}
            key={i}
            ref={(el: HTMLDivElement | null) => imageRefs.current.push(el)}
          >
            <Image
              key={img}
              src={img}
              alt={desc}
              onMouseOver={() => setHovered(i)}
              onMouseMove={({ clientX: x, clientY: y }) =>
                getRelMousePosition(x, y, i)
              }
              onClick={() => {
                setOpenImage(img);
                handleLightBoxToggle();
              }}
            />
            {hovered === i && (
              <animated.div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: 0,
                  zIndex: 5,
                  color: "#fff",
                  pointerEvents: "none",
                  transform: transProps.xy.to(trans3)
                }}
              >
                <ImageDesc>{desc}</ImageDesc>
              </animated.div>
            )}
          </div>
        ))}
      </GridContainer>
    </>
  );
};

export default GridView;
