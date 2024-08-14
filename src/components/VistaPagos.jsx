import {
  CircularProgress,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import ModalPagos from "./ModalPagos";
import { useEffect, useState } from "react";
import axios from "axios";

export const VistaPagos = () => {
  const [pago, setPago] = useState("");

  const [isLoading, setIsloading] = useState(pago ? false : true);

  const handleGetPago = async () => {
    const { data } = await axios.get("/api/pagos");
    setPago(data[0]);
    setIsloading(false);
  };

  useEffect(() => {
    handleGetPago();
  }, [setPago]);

  if (isLoading) {
    return (
      <Flex w="100%" minH="60vh" alignItems="center" justifyContent="center">
        {/* <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        /> */}
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
    <>
      {pago ? (
        <Flex
          direction="column"
          gap="4"
          w="50%"
          p="4"
          rounded="lg"
          border="solid 1px"
        >
          <Flex justifyContent="space-between">
            <Text Text p="2">
              Registro
            </Text>
            {pago.confirmado ? (
              <Text
                p="2"
                rounded="xl"
                border="solid 3px green"
                bg={useColorModeValue("green.300", "green.800")}
              >
                Confirmado
              </Text>
            ) : (
              <Text
                p="2"
                rounded="xl"
                border="solid 3px yellow"
                bg={useColorModeValue("yellow.500", "yellow.500")}
              >
                Pendiente
              </Text>
            )}
          </Flex>
          <Flex
            direction="column"
            bg={useColorModeValue("gray.300", "gray.700")}
            p="2"
            rounded="xl"
          >
            <Text>
              {pago.metodo.typeMetodo === "fisico"
                ? "Adulto: " + pago.referencia
                : "Referencia " + pago.referencia}
            </Text>
            <Text>
              {" "}
              Monto:
              {pago.metodo.typeMetodo === "fisico"
                ? " " + pago.monto + " $"
                : " " + pago.monto + " bs"}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex
          direction="column"
          gap="4"
          w="50%"
          p="4"
          rounded="lg"
          border="solid 1px"
        >
          <Flex justifyContent="space-between">
            <Text>Registro</Text>
            <Text></Text>
          </Flex>
          <ModalPagos
            title="Pagar registro"
            handleGetPago={handleGetPago}
          ></ModalPagos>
        </Flex>
      )}
    </>
  );
};

export default VistaPagos;
