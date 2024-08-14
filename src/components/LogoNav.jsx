import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "../images/logo.png";

export const LogoNav = () => {
  return (
    <>
      <Flex w="100vw" h="100%" justifyContent="flex-end">
        <Flex direction="column" justifyContent="space-around" p="2">
          <Text as="b" textAlign="right" fontSize="lg">
            G.S. Don Bosco Ávila
          </Text>
          <Text as="cite" textAlign="right" fontSize="xs">
            Fundado en 1963
          </Text>
        </Flex>
        <Box
          p="4"
          pr="8"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image borderRadius="full" boxSize="12" src={logo} alt />
        </Box>
      </Flex>
    </>
  );
};

export default LogoNav;
