import styled from "styled-components";
import { mixins, theme } from "styles";
import Link from "next/link";

export const StyledLink = styled.a`
  ${mixins.smallButton}
  font-family: ${theme.fonts.serif};
`;

export const StyledRedirect = styled(Link)`
  ${mixins.smallButton}
`;
