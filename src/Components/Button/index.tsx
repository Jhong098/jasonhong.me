import styled from "styled-components";
import { mixins } from "styles";
import { Link } from "react-router-dom";

export const StyledLink = styled.a`
  ${mixins.smallButton}
`;

export const StyledRedirect = styled(Link)`
  ${mixins.smallButton}
`;
