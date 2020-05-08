import styled from "styled-components";
import { mixins, theme } from "styles";
import { Link } from "react-router-dom";

export const StyledLink = styled.a`
  ${mixins.smallButton}
  font-family: ${theme.fonts.serif};
`;

export const StyledRedirect = styled(Link)`
  ${mixins.smallButton}
`;
