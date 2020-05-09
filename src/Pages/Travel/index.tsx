import React, { useState, useRef } from "react";
import Cards from "Components/Cards";

import { travel } from "copy";
import styled from "styled-components";
import { theme } from "styles";
import { Grid, Cards as CardsIcon, LeftArrow } from "static";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const { colors, spaces } = theme;

interface ImageProps {
  images: { img: string; desc: string }[];
}

const trans3 = (x: any, y: any) => `translate3d(${x / 10}px,${y / 10}px,0)`;

const Container = styled.div`
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

const ImageDesc = styled.h2`
  margin: 0;
`;

const BackButton = styled(Link)`
  position: absolute;
  left: ${spaces.md};
  top: ${spaces.md};
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;

  > * {
    margin: 0 5px;
  }

  &:hover {
    color: ${colors.neonBlue};
  }
`;

const ViewToggle = styled.button`
  position: absolute;
  right: ${spaces.md};
  top: ${spaces.md};
  cursor: pointer;
  z-index: 20;
  color: ${colors.lightGrey};

  &:hover {
    color: ${colors.neonBlue};
  }
`;

const Image = styled.img`
  cursor: pointer;
`;

const GridView: React.FC<ImageProps> = ({ images }) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  console.log(hovered);

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
    <Container>
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
          />
          {hovered === i && (
            <animated.div
              style={{
                position: "absolute",
                top: "30%",
                left: 0,
                zIndex: 5,
                color: "#fff",
                mixBlendMode: "difference",
                transform: transProps.xy.to(trans3)
              }}
            >
              <ImageDesc>{desc}</ImageDesc>
            </animated.div>
          )}
        </div>
      ))}
    </Container>
  );
};

const Travel = () => {
  const [isCardView, setIsCard] = useState(false);
  return (
    <div id="travel">
      <BackButton to="/">
        <LeftArrow />
        Back
      </BackButton>
      <ViewToggle onClick={() => setIsCard(!isCardView)}>
        {isCardView ? <Grid /> : <CardsIcon />}
      </ViewToggle>
      {isCardView ? <Cards images={travel} /> : <GridView images={travel} />}
    </div>
  );
};

export default Travel;
