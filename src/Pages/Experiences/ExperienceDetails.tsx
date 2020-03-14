import React from "react";
import { useParams } from "react-router-dom";
import { experiencesList } from "copy";
import "./Experiences.scss";

const ExperienceDetails = () => {
  const { number } = useParams();
  const { title, img, desc, details } = experiencesList[number || 0];
  return (
    <div id="experience-details">
      <div className="section-1">
        <div
          className="bg-img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <h1 className="title">{title}</h1>
        <div className="desc">
          {desc.map((str: string) => (
            <p>{str}</p>
          ))}
        </div>
      </div>
      <div className="section-2">
        {details.map((str: string) => (
          <p>{str}</p>
        ))}
      </div>
    </div>
  );
};

export default ExperienceDetails;
