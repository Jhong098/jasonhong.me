import { css } from "styled-components";

export const sizes = {
  giant: 1440,
  bigDesktop: 1200,
  desktop: 1000,
  tablet: 768,
  thone: 600,
  phablet: 480,
  phone: 376,
  tiny: 330
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(literals, ...placeholders)}
    }
  `;
  return acc;
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => string>);
