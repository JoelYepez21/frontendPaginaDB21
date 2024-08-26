import DivForm from "../components/componentesUser/DivForm";
import SmallWithLogoLeft from "../components/Footer";
import InfoDiv from "../components/InfoDiv";
import NavBar from "../components/navbars/NavBar";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export const Home = () => {
  return (
    <>
      <Flex
        minH="100vh"
        bg={useColorModeValue("gray.200", "gray.700")}
        flexDirection="column"
        alignItems="center"
        gap={{ base: "none", md: "4" }}
      >
        <NavBar />
        <DivForm />
        <InfoDiv />
        <SmallWithLogoLeft />
      </Flex>
    </>
  );
};
export default Home;
