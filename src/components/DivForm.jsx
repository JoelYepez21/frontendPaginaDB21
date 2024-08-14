import { Box, Flex, Image } from "@chakra-ui/react";
import logo from "../images/Galleta_grupo.png";
import FormMain from "./Form";
export const DivForm = () => {
  return (
    <Flex
      gap={{ base: "4", md: "12", lg: "28" }}
      direction={{ base: "column", md: "row" }}
      p="8"
    >
      <Box boxSize="18rem" alignSelf="center">
        <Image src={logo} alt />
      </Box>
      <FormMain />
    </Flex>
  );
};

export default DivForm;
