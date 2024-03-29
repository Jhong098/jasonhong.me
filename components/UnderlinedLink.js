import styled from '@emotion/styled';
import Link from 'next/link';

const UnderlinedLink = styled(Link)`
  border-style: dotted;
  border-width: 1px 1px 2px;
  border-color: transparent transparent rgba(92, 92, 92, 3.21);
  transition: opacity 0.1s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export default UnderlinedLink;
