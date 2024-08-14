import {
  CircularProgress,
  Divider,
  Flex,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import ModalCrearMetodo from "./ModalCrearMetodo";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertDialogueDelete from "./AlertDeleteUser";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { FiEdit3 } from "react-icons/fi";
import PopoverForm from "./BtnEditarMetodo";

export const VistaPagosSuperUser = () => {
  const [metodos, setMetodos] = React.useState([]);
  const [pagos, setPagos] = React.useState([]);
  const [pagosBase, setPagosBase] = React.useState([]);
  const [typeMetodo, setTypeMetodo] = useState("");
  const [estado, setEstado] = useState("");
  const [isLoading, setIsloading] = useState(
    !pagosBase && !metodos ? false : true
  );
  const toast = useToast();

  const handleGetMetodos = async () => {
    const { data } = await axios.get("/api/metodos/a");
    setMetodos(data);
  };

  useEffect(() => {
    handleGetMetodos();
  }, [setMetodos]);

  const handleGetPago = async () => {
    const { data } = await axios.get("/api/pagos");
    setPagosBase(
      data.sort((a, b) => {
        a = a.user.name.toLowerCase();
        b = b.user.name.toLowerCase();
        if (a == b) {
          return 0;
        }
        if (a < b) {
          return -1;
        }
        return 1;
      })
    );
    setIsloading(false);
  };

  useEffect(() => {
    handleGetPago();
  }, [setPagosBase]);

  useEffect(() => {
    const handleFiltro = async () => {
      if (estado === "" && typeMetodo === "") {
        return setPagos(pagosBase);
      } else if (estado === "true" && typeMetodo === "") {
        return setPagos(pagosBase.filter((pago) => pago.confirmado));
      } else if (estado === "" && typeMetodo === "digital") {
        return setPagos(
          pagosBase.filter((pago) => pago.metodo.typeMetodo === typeMetodo)
        );
      } else if (estado === "" && typeMetodo === "fisico") {
        return setPagos(
          pagosBase.filter((pago) => pago.metodo.typeMetodo === typeMetodo)
        );
      } else if (estado === "false" && typeMetodo === "") {
        return setPagos(pagosBase.filter((pago) => !pago.confirmado));
      } else if (estado === "true" && typeMetodo === "digital") {
        return setPagos(
          pagosBase.filter(
            (pago) => pago.confirmado && pago.metodo.typeMetodo === typeMetodo
          )
        );
      } else if (estado === "true" && typeMetodo === "fisico") {
        return setPagos(
          pagosBase.filter(
            (pago) => pago.confirmado && pago.metodo.typeMetodo === typeMetodo
          )
        );
      } else if (estado === "false" && typeMetodo === "digital") {
        return setPagos(
          pagosBase.filter(
            (pago) => !pago.confirmado && pago.metodo.typeMetodo === typeMetodo
          )
        );
      } else if (estado === "false" && typeMetodo === "fisico") {
        return setPagos(
          pagosBase.filter(
            (pago) => !pago.confirmado && pago.metodo.typeMetodo === typeMetodo
          )
        );
      }
    };

    handleFiltro();
  }, [estado, pagosBase, typeMetodo]);

  const handleDeleteMetodo = async (metodoEsperado) => {
    try {
      await axios.delete(`/api/metodos/${metodoEsperado.id}`);
      toast({
        title: "Advertencia",
        description: "Metodo Eliminado",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleGetMetodos();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletePago = async (pagoEsperado) => {
    // setPagos(pagos.filter((pago) => pago.id != pagoEsperado.id));
    await axios.delete(
      `/api/pagos/${pagoEsperado.id}/${pagoEsperado.user.email}`
    );
    toast({
      title: "Advertencia",
      description: "Pago Eliminado",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetPago();
  };
  const handleConfirPago = async (pagoEsperado) => {
    await axios.patch(`/api/pagos/${pagoEsperado.id}`, {
      confirmado: true,
      pago: pagoEsperado,
    });
    toast({
      title: "Pago confirmado",
      description: "",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetPago();
  };
  const handleDesconfirPago = async (pagoEsperado) => {
    await axios.patch(`/api/pagos/${pagoEsperado.id}`, {
      confirmado: false,
      pago: pagoEsperado,
    });
    toast({
      title: "Pago desconfirmado",
      description: "",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetPago();
  };
  return (
    <Flex direction="column" gap="4">
      <ModalCrearMetodo
        title="Crear metodo de pago"
        // metodos={metodos}
        // setMetodos={setMetodos}
        handleGetMetodos={handleGetMetodos}
      />
      {isLoading ? (
        <Flex w="100%" minH="60vh" alignItems="center" justifyContent="center">
          <CircularProgress
            isIndeterminate
            color="yellow.300"
            thickness="8px"
            size="xs"
          />
        </Flex>
      ) : (
        <>
          <Flex gap="4" direction={{ base: "column", sm: "row" }} w="100%">
            {metodos.map((metodo) => (
              <Flex
                bg={useColorModeValue("white", "gray.800")}
                direction="column"
                w={{ base: "100%", md: "50%" }}
                flexWrap="wrap"
                rounded="xl"
                key={metodo.name}
                id={metodo.id}
              >
                <Flex
                  direction="row"
                  p="4"
                  gap="4"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  {/* <ModalEditMetodo metodoPasado={metodo}></ModalEditMetodo> */}
                  <PopoverForm
                    metodo={metodo}
                    getMetodos={handleGetMetodos}
                  ></PopoverForm>
                  <Text fontSize="2xl" textAlign="center">
                    {metodo.name}
                  </Text>
                  <AlertDialogueDelete
                    title="Eliminar metodo de pago"
                    text="¿Estas seguro que deseas eliminar este metodo de pago?"
                    textBtn="Eliminar"
                    logo={<CloseIcon />}
                    metodo={metodo}
                    handleDeleteFunction={handleDeleteMetodo}
                  ></AlertDialogueDelete>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Divider
            borderColor={useColorModeValue("black", "gray.600")}
            mt={2}
            mb={2}
          />
          <Flex
            gap="4"
            direction={{ base: "column", lg: "row" }}
            w="100%"
            flexWrap="wrap"
          >
            <Flex gap="4" w={"100%"}>
              <Select
                border="solid 1px"
                onChange={({ target }) => setEstado(target.value)}
                mb={4}
              >
                <option value="">Filtrar por confirmacion</option>
                <option value={"true"}>Confirmado</option>
                <option value={"false"}>Por confirmar</option>
              </Select>
              <Select
                border="solid 1px"
                onChange={({ target }) => setTypeMetodo(target.value)}
                mb={4}
              >
                <option value="">Filtrar por metodo</option>
                {metodos.map((metodo) => (
                  <option
                    value={metodo.typeMetodo}
                    key={metodo.name}
                    id={metodo.id}
                  >
                    {metodo.name}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex
              direction={{ base: "column", lg: "row" }}
              maxH="60vh"
              overflow="scroll"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              gap="4"
              flexWrap={{ base: "nowrap", lg: "wrap" }}
              w="100%"
            >
              {pagos.length === 0 ? (
                <Flex w={"100%"} justifyContent={"center"}>
                  <Text>No hay ningun pago </Text>
                </Flex>
              ) : (
                pagos.map((pago) => (
                  <Flex
                    bg={useColorModeValue("white", "gray.800")}
                    direction="column"
                    rounded="xl"
                    w={{ base: "100%" }}
                    border={
                      !pago.confirmado ? "yellow solid 1px" : "green solid 1px"
                    }
                    key={pago.user.name}
                    id={pago.id}
                  >
                    <Flex
                      direction="row"
                      p="4"
                      gap="4"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      {pago.confirmado ? (
                        <AlertDialogueDelete
                          title="Desconfirmar pago"
                          text={`¿Estas seguro que deseas desconfirmar el pago de ${pago.user.name}?`}
                          textBtn="Desconfirmar"
                          logo={<FiEdit3 />}
                          metodo={pago}
                          handleDeleteFunction={handleDesconfirPago}
                        />
                      ) : (
                        <AlertDialogueDelete
                          title="Confirmar pago"
                          text={`¿Estas seguro que deseas confirmar el pago de ${pago.user.name}?`}
                          textBtn="Confirmar"
                          logo={<CheckIcon />}
                          metodo={pago}
                          handleDeleteFunction={handleConfirPago}
                        />
                      )}
                      <Flex direction="column" gap="4">
                        <Text fontSize="2xl" textAlign="center">
                          {pago.user.name}
                        </Text>
                        <Flex gap="8">
                          <Text fontSize="2xl" textAlign="center">
                            {pago.referencia}
                          </Text>
                          <Text fontSize="2xl" textAlign="center">
                            {pago.metodo.typeMetodo === "digital"
                              ? pago.monto + "bs"
                              : pago.monto + "$"}
                            {/* {pago.monto} */}
                          </Text>
                          <Text fontSize="2xl" textAlign="center">
                            {pago.fecha}
                          </Text>
                        </Flex>
                      </Flex>

                      <AlertDialogueDelete
                        title="Eliminar pago"
                        text={`¿Estas seguro que deseas eliminar el pago de ${pago.user.name}?`}
                        textBtn="Eliminar"
                        logo={<CloseIcon />}
                        metodo={pago}
                        handleDeleteFunction={handleDeletePago}
                      ></AlertDialogueDelete>
                    </Flex>
                  </Flex>
                ))
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default VistaPagosSuperUser;
