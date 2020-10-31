import NextLink from "next/link";
import { Flex, Link, IconButton } from "@chakra-ui/core";

const Footer = () => (
  <footer>
    <Flex align="center" mb={4} direction="column">
      <div>
        <Link href="" title="Github" isExternal>
          <IconButton
            aria-label="Github"
            icon="github"
            size="lg"
            color="gray.500"
            variant="ghost"
          />
        </Link>
      </div>
    </Flex>
  </footer>
);

export default Footer;
