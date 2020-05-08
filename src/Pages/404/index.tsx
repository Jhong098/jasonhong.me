import React, { memo } from "react";
import "./404.scss";
import styled from "styled-components";
import { motion } from "framer-motion";
import { StyledRedirect } from "Components/Button";
import { mixins } from "styles";
import { Helmet } from "react-helmet";

const Container = styled.div`
  ${mixins.flexCenter}
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const ButtonContainer = styled(motion.div)`
  margin-top: 100px;
`;

const NotFound = () => {
  return (
    <Container>
      <Helmet>
        <body className="blur" />
      </Helmet>
      <span className="info">
        Nothing Here{" "}
        <ButtonContainer whileHover={{ y: -5 }} animate={{ opacity: [0, 1] }}>
          <StyledRedirect to="/">Go back</StyledRedirect>
        </ButtonContainer>
      </span>
      <div className="error">404</div>
    </Container>
  );
};

export default memo(NotFound);
