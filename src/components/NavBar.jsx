import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import LogoNav from "./LogoNav";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Flex bg={useColorModeValue("#fbf090", "gray.600")} w="100%" h="20">
        <Button onClick={toggleColorMode} alignSelf="center" ml="4">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <LogoNav />
      </Flex>
    </>
  );
};

export default NavBar;
