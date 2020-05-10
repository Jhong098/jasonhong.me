import React from "react";
import styled from "styled-components";
import { mixins, theme } from "styles";
import { media } from "breakpoints";
import { Github } from "static";

const { fontSizes, colors, fonts } = theme;

interface ProjectProps {
  title: string;
  time: string;
  img: string;
  video: string;
  desc: string;
  techs: string[];
  link: string;
  github: string;
  revealProjects: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ProjectContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
  grid-column: 1 / -1;
  padding: 40px 40px 30px;
  z-index: 5;
`};
  ${media.phablet`padding: 30px 25px 20px;`};
`;

const ProjectLabel = styled.h4`
  font-family: ${fonts.serif};
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: ${colors.neonBlue};
  margin: 10px 0;
  padding-top: 0;
`;

const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 5px 0 20px;
  color: ${colors.white};
  ${media.desktop`font-size: ${fontSizes.lg};`};
  ${media.tablet`font-size: ${fontSizes.md};`};
  a {
    &:hover {
      color: ${colors.neonBlue};
    }
    ${media.tablet`display: block;`};
  }
`;

const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightestNavy};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `};
  p {
    margin: 0;
  }
  a {
    ${mixins.inlineLink};
  }
`;

const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;
  li {
    font-family: ${fonts.serif};
    font-size: ${fontSizes.smish};
    color: ${colors.lightGrey};
    margin-right: ${theme.spaces.md};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: ${colors.lightGrey};
      margin-right: 10px;
    `};
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestNavy};
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
      &:hover {
        stroke: ${colors.neonBlue};
      }
    }
  }
`;

const Media = `  width: 100%;
max-width: 100%;
vertical-align: middle;
border-radius: ${theme.borderRadius}px;
position: relative;
mix-blend-mode: multiply;
filter: grayscale(100%) contrast(1) brightness(90%);
${media.tablet`
  object-fit: cover;
  width: auto;
  height: 100%;
  filter: grayscale(100%) contrast(1) brightness(80%);
`};`;

const StyledVideo = styled.video`
  ${Media}
`;

const StyledImg = styled.img`
  ${Media}
`;

const StyledMediaContainer = styled.a`
  ${mixins.boxShadow};
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  background-color: ${colors.neonBlue};
  border-radius: ${theme.borderRadius + 1}px;
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    grid-column: 1 / -1;
    opacity: 0.25;
  `};
  &:hover,
  &:focus {
    background: transparent;
    &:before,
    ${StyledVideo} {
      background: transparent;
      filter: none;
    }
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.darkNavy};
    mix-blend-mode: screen;
  }
`;

const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 100px;
  ${media.thone`
    margin-bottom: 70px;
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    ${ProjectContent} {
      grid-column: 7 / -1;
      text-align: right;
      ${media.thone`
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      `};
      ${media.phablet`padding: 30px 25px 20px;`};
    }
    ${StyledTechList} {
      justify-content: flex-end;
      li {
        margin-left: ${theme.spaces.md};
        margin-right: 0;
      }
    }
    ${StyledLinkWrapper} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    ${StyledMediaContainer} {
      grid-column: 1 / 8;
      ${media.tablet`height: 100%;`};
      ${media.thone`
        grid-column: 1 / -1;
        opacity: 0.25;
      `};
    }
  }
`;

const Project: React.FC<ProjectProps> = ({
  title,
  time,
  img,
  video,
  desc,
  techs,
  link,
  github,
  revealProjects
}) => {
  console.log(img);
  return (
    <StyledProject
      key={title}
      ref={(el: HTMLDivElement | null) => revealProjects.current.push(el)}
    >
      <ProjectContent>
        <ProjectLabel>{time}</ProjectLabel>
        <StyledProjectName>
          <a href={link} target="_blank" rel="nofollow noopener noreferrer">
            {title}
          </a>
        </StyledProjectName>
        <StyledDescription>{desc}</StyledDescription>
        <StyledTechList>
          {techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </StyledTechList>
        <StyledLinkWrapper>
          <a href={github} target="_blank" rel="nofollow noopener noreferrer">
            <Github />
          </a>
        </StyledLinkWrapper>
      </ProjectContent>

      <StyledMediaContainer
        href={link}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {video ? (
          <StyledVideo autoPlay loop muted playsInline>
            <source src={video} type="video/webm"></source>
          </StyledVideo>
        ) : (
          <StyledImg src={img} alt={desc} />
        )}
      </StyledMediaContainer>
    </StyledProject>
  );
};

export default Project;
