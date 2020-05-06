import React, { memo } from "react";
import Divider from "Components/Divider";

const SectionHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <Divider />
      <h2>{text}</h2>
    </>
  );
};

export default memo(SectionHeader);
