import React from "react";
import { useParams } from "react-router-dom";

const ExperienceDetails = () => {
  const { number } = useParams();
  return <div>{number}</div>;
};

export default ExperienceDetails;
