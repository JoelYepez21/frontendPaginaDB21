import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import FormLogin from "../formularios/formulariosDeInicio/FormLogin";
import FormRegistro from "../formularios/formulariosDeInicio/FormRegistro";

export const FormMain = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShow = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Flex
      bg={useColorModeValue("yellow.200", "gray.600")}
      p="4"
      rounded="12"
      gap="4"
      display="flex"
      flexDirection="column"
    >
      {!showLogin ? (
        <FormLogin handleShow={handleShow} />
      ) : (
        <FormRegistro handleShow={handleShow} />
      )}
    </Flex>
  );
};

export default FormMain;
