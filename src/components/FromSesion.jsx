import { CircularProgress, Flex, useColorModeValue } from "@chakra-ui/react";
import FormIcon from "./FromIcon";
import Formulario from "./Formulario";
import { useEffect, useState } from "react";
import axios from "axios";
import FormularioEditable from "./FormularioEditable";

export const FormSesion = () => {
  const [datos, setDatos] = useState("");
  const [isLoading, setIsloading] = useState(datos ? false : true);

  const hanldeGetDatos = async () => {
    const { data } = await axios.get("/api/datos");
    setDatos(data[0]);
    setIsloading(false);
  };
  useEffect(() => {
    hanldeGetDatos();
  }, [setDatos]);

  if (isLoading) {
    return (
      <Flex w="100%" minH="60vh" alignItems="center" justifyContent="center">
        <CircularProgress
          isIndeterminate
          color="yellow.300"
          thickness="8px"
          size="xs"
        />
      </Flex>
    );
  }

  return (
    <Flex
      bg={useColorModeValue("white", "gray.900")}
      rounded="8"
      direction="row"
      flexWrap="wrap"
      justifyContent="space-around"
      border="solid 1px"
      gap={4}
      py={8}
      px={4}
    >
      <FormIcon />
      {datos ? (
        <FormularioEditable datos={datos} hanldeGetDatos={hanldeGetDatos} />
      ) : (
        <Formulario hanldeGetDatos={hanldeGetDatos} />
      )}
    </Flex>
  );
};

export default FormSesion;
