import NextLink from 'next/link';
import { Flex, Link, IconButton } from '@chakra-ui/react';
import { FaDeviantart } from 'react-icons/fa';

import NowPlaying from './NowPlaying';
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TwitterIcon
} from './CustomIcons';

const SOCIAL_LINKS = [
  {
    aria: 'Github',
    icon: GithubIcon,
    href: 'https://github.com/Jhong098',
    title: 'Github'
  },
  {
    aria: 'Twitter',
    icon: TwitterIcon,
    href: 'https://twitter.com/jadoretech',
    title: 'Twitter'
  },
  {
    aria: 'LinkedIn',
    icon: LinkedInIcon,
    href: 'https://www.linkedin.com/in/jason-hong/',
    title: 'LinkedIn'
  },
  {
    aria: 'Instagram',
    icon: InstagramIcon,
    href: 'https://www.instagram.com/hong.json/',
    title: 'Instagram'
  },
  {
    aria: 'DeviantArt',
    icon: FaDeviantart,
    href: 'https://www.deviantart.com/jhong098',
    title: 'DeviantArt'
  },
  {
    aria: 'email',
    icon: MailIcon,
    href: 'mailto:jhong098@gmail.com',
    title: 'email'
  }
];

const INTERNAL_LINKS = [
  {
    href: '/uses',
    title: 'Uses',
    text: '>uses'
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
      icon={icon()}
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
    <Flex align="center" mt={8} mb={8} direction="column">
      <NowPlaying />
      <div>{SOCIAL_LINKS.map(getIcon)}</div>
      <div>{INTERNAL_LINKS.map(getLink)}</div>
    </Flex>
  </footer>
);

export default Footer;
