import React, { useRef, useEffect } from "react";
import SectionHeader from "Components/SectionHeader";
import styled from "styled-components";
import { projects } from "copy";
import sr, { srConfig } from "utils/scrollReveal";
import { mixins } from "styles";

import Project from "./Project";

const ProjectContainer = styled.div`
  ${mixins.flexCenter};
  ${mixins.sectionPadding}
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
`;

const Projects = () => {
  const revealProjects = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (revealProjects.current) {
      revealProjects.current.forEach((ref, i) => {
        if (ref) {
          sr?.reveal(ref, srConfig(i * 100));
        }
      });
    }
  }, []);
  return (
    <ProjectContainer id="projects">
      <SectionHeader text="Projects" />
      <div>
        {projects.map(({ title, time, img, desc, techs, link, github }, i) => (
          <Project
            revealProjects={revealProjects}
            key={title}
            title={title}
            time={time}
            img={img}
            desc={desc}
            techs={techs}
            link={link}
            github={github}
          />
        ))}
      </div>
    </ProjectContainer>
  );
};

export default Projects;
