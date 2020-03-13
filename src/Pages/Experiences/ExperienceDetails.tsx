import React from "react";
import { useParams } from "react-router-dom";
import { experiencesList } from "copy";
import "./Experiences.scss";

const ExperienceDetails = () => {
  const { number } = useParams();
  const { title, img, desc } = experiencesList[number || 0];
  return (
    <div id="experience-details">
      <div className="bg-img" style={{ backgroundImage: `url(${img})` }}></div>
      <h1 className="title">{title}</h1>
      <div className="desc">{desc}</div>
    </div>
  );
};

export default ExperienceDetails;
