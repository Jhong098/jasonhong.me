import NextLink from 'next/link';
import { Flex, Link, IconButton } from '@chakra-ui/core';

import NowPlaying from './NowPlaying';

const SOCIAL_LINKS = [
  {
    aria: 'Github',
    icon: 'github',
    href: 'https://github.com/Jhong098',
    title: 'Github'
  },
  {
    aria: 'Twitter',
    icon: 'twitter',
    href: 'https://twitter.com/jadoretech',
    title: 'Twitter'
  },
  {
    aria: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/jason-hong/',
    title: 'LinkedIn'
  },
  {
    aria: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/hong.json/',
    title: 'Instagram'
  },
  {
    aria: 'email',
    icon: 'mail',
    href: 'mailto:jhong098@gmail.com',
    title: 'email'
  }
];

const INTERNAL_LINKS = [
  {
    href: '/tools',
    title: 'Tools',
    text: '>tools'
  },
  {
    href: '/resume.pdf',
    title: 'Resume',
    text: '>resume'
  }
];

const getIcon = ({ aria, icon, href, title }) => (
  <Link key={title} href={href} title={title} isExternal>
    <IconButton
      aria-label={aria}
      icon={icon}
      size="lg"
      color="gray.500"
      variant="ghost"
    />
  </Link>
);

const getLink = ({ href, title, text }) => (
  <NextLink href={href} passHref key={title}>
    <Link fontSize="sm" color="gray.500" minWidth="100px" mr={2} title={title}>
      {text}
    </Link>
  </NextLink>
);

const Footer = () => (
  <footer>
    <Flex align="center" mt={8} mb={4} direction="column">
      <NowPlaying />
      <div>{SOCIAL_LINKS.map(getIcon)}</div>
      <div>{INTERNAL_LINKS.map(getLink)}</div>
    </Flex>
  </footer>
);

export default Footer;
