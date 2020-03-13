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
      <h1>{title}</h1>
    </div>
  );
};

export default ExperienceDetails;
