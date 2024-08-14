import { CircularProgress, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export const Verify = () => {
  const [showError, setShowError] = useState(false);

  const handleShowError = () => {
    setShowError(!showError);
  };

  (async () => {
    try {
      handleShowError(true);
      console.log(showError);
      const id = window.location.pathname.split("/")[2];
      const token = window.location.pathname.split("/")[3];
      await axios.patch(`http://localhost:3003/api/users/${id}/${token}`);
      window.location.pathname = "/";
    } catch (error) {
      handleShowError(true);
    }
  })();

  return (
    <>
      <Flex
        minH="100vh"
        bg="gray.300"
        alignItems="center"
        justifyContent="center"
      >
        {showError ? (
          <Flex flexDirection="column" alignItems="center" gap="4">
            <CircularProgress isIndeterminate color="green.300" size="32" />
            <Heading>Verificando...</Heading>
          </Flex>
        ) : (
          <Flex flexDirection="column" alignItems="center">
            <Text fontSize="12rem" color="red.500">
              X
            </Text>
            <Heading textAlign="center" px="4">
              El link ya expiro. Se ha enviado un nuevo link de verificacion a
              su correo
            </Heading>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default Verify;
