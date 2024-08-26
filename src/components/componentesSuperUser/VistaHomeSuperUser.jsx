import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useAuth } from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
import axios from "axios";

import SeccionInfo from "./SeccionInfo";
import { FiDollarSign, FiPlusCircle, FiTrash2, FiUser } from "react-icons/fi";
import AlertDialogueDelete from "./AlertDeleteUser";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

// vista de inicio para el admi
export const VistaHomeSuperUser = () => {
  const { auth } = useAuth();
  const toast = useToast();
  const [isLoading, setIsloading] = useState(auth ? false : true);
  const [show, setShow] = useState(true);
  const [usuarios, setUsuarios] = React.useState([]);
  const [pagos, setPagos] = React.useState([]);
  const [fichas, setFichas] = React.useState([]);
  // funcion para obtener los usuarios en orden alfabetico
  const handleGetUsuarios = async () => {
    const { data } = await axios.get("/api/users");
    setUsuarios(
      data.users.sort((a, b) => {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();
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
    handleGetUsuarios();
  }, [setUsuarios]);
  // funcion para obtener los pagos
  const handleGetPago = async () => {
    const { data } = await axios.get("/api/pagos");
    setPagos(data);
    setIsloading(false);
  };

  useEffect(() => {
    handleGetPago();
  }, [setPagos]);
  // funcion para obtener las fichas medicas
  const handleGetFichas = async () => {
    const { data } = await axios.get("/api/pdffiles");
    setFichas(data.Pdf);
  };

  useEffect(() => {
    handleGetFichas();
  }, [setFichas]);
  // oculta el bienvenido despues de 2s
  useEffect(() => {
    const changeShow = () => {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    };
    changeShow();
  });
  // funcion para eliminar un usuario
  const handleDeleteUser = async (usuarioEsperado) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id != usuarioEsperado.id));
    await axios.delete(`/api/users/${usuarioEsperado.id}`);
    toast({
      title: "Advertencia",
      description: "Usuario Eliminado",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Flex direction="column" gap="4">
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
          <Collapse
            in={show}
            transition={{ exit: { delay: 1 }, enter: { duration: 1 } }}
          >
            <Flex gap="4" w="100%" justify="center">
              <Heading>Bienvenido {auth.name}</Heading>
            </Flex>
            <Divider
              borderColor={useColorModeValue("black", "gray.600")}
              mt={4}
              mb={0}
            />
          </Collapse>
          <Flex gap="4" flexDirection="column" justifyContent="space-around">
            <Flex
              direction={{ base: "column", lg: "row" }}
              gap="4"
              justifyContent="space-around"
              alignItems={"center"}
            >
              <Flex direction="column" gap="4" w={"100%"}>
                <Flex
                  gap="12"
                  p="4"
                  rounded="xl"
                  border="solid 1px darkgray"
                  justifyContent="space-around"
                >
                  <Box>
                    <Text fontSize="2xl">Usuarios</Text>
                    <Text>{usuarios.length} usuarios</Text>
                  </Box>
                  <FiUser size="4rem" />
                </Flex>
                <SeccionInfo
                  gap="12"
                  array={usuarios}
                  arrayFiltrado={
                    usuarios.filter((usuario) => usuario.registrado === true)
                      .length
                  }
                  title={"Usuarios registrados"}
                  description={" usuarios con datos"}
                />
              </Flex>
              <Flex direction="column" gap="4" w={"100%"}>
                <Flex
                  gap="12"
                  p="4"
                  rounded="xl"
                  border="solid 1px darkgray"
                  justifyContent="space-around"
                >
                  <Box>
                    <Text fontSize="2xl">Pagos</Text>
                    <Text>{pagos.length} pagos</Text>
                  </Box>
                  <FiDollarSign size="4rem" />
                </Flex>
                <SeccionInfo
                  gap="4"
                  array={pagos}
                  arrayFiltrado={
                    pagos.filter((usuario) => usuario.confirmado === true)
                      .length
                  }
                  title={"Pagos confirmados"}
                  description={
                    pagos.filter((usuario) => usuario.confirmado === true)
                      .length === 0
                      ? "Ningun pago confirmado"
                      : " pagos confirmados"
                  }
                />
              </Flex>
              <Flex direction="column" w={{ base: "100%", lg: "50%" }}>
                <Flex
                  gap="8"
                  p="4"
                  direction={{ base: "row", lg: "column" }}
                  rounded="xl"
                  border="solid 1px darkgray"
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <FiPlusCircle size="4rem" />
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text textAlign={"center"} fontSize={"2xl"}>
                      {fichas.length} <br />
                      Fichas medicas
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w={"100%"}
              gap={"4"}
              flexWrap={{ base: "wrap", lg: "nowrap" }}
            >
              <SeccionInfo
                gap="4"
                array={usuarios.filter(
                  (usuario) => usuario.registrado === true
                )}
                arrayFiltrado={
                  usuarios.filter((usuario) => {
                    if (usuario.datos) {
                      if (usuario.datos.unidad === "Manada") {
                        return usuario;
                      }
                    }
                  }).length
                }
                title={"Manada"}
                description={" Lobatos"}
              />
              <SeccionInfo
                gap="4"
                array={usuarios.filter(
                  (usuario) => usuario.registrado === true
                )}
                arrayFiltrado={
                  usuarios.filter((usuario) => {
                    if (usuario.datos) {
                      if (usuario.datos.unidad === "Tropa") {
                        return usuario;
                      }
                    }
                  }).length
                }
                title={"Tropa"}
                description={" Scouts"}
              />
              <SeccionInfo
                gap="4"
                array={usuarios.filter(
                  (usuario) => usuario.registrado === true
                )}
                arrayFiltrado={
                  usuarios.filter((usuario) => {
                    if (usuario.datos) {
                      if (usuario.datos.unidad === "Clan") {
                        return usuario;
                      }
                    }
                  }).length
                }
                title={"Clan"}
                description={" Rovers"}
              />
            </Flex>
            <Flex p={"4"} w={"100%"} direction={"column"} gap={"4"}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Vista Rapida
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    maxH="32vh"
                    overflow="scroll"
                    sx={{
                      "::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    {usuarios.length === 0 ? (
                      <Flex w={"100%"} justifyContent={"center"}>
                        <Text>No hay ningun usuario </Text>
                      </Flex>
                    ) : (
                      <>
                        <Flex alignItems={"center"} p={"1"}>
                          <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                            <Text>Nombre</Text>
                          </Flex>
                          <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                            <Text>Datos</Text>
                          </Flex>
                          <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                            <Text>Eliminar</Text>
                          </Flex>
                        </Flex>
                        {usuarios.map((usuario) => (
                          <Flex
                            key={usuario.name}
                            alignItems={"center"}
                            p={"1"}
                          >
                            <Flex
                              w={"100%"}
                              bg={usuario.datos ? "green.700" : "gray.500"}
                              rounded={"lg"}
                            >
                              <Flex
                                w={"100%"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                p={"1"}
                              >
                                <Text>{usuario.name}</Text>
                              </Flex>
                              <Flex
                                w={"100%"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                p={"1"}
                              >
                                {usuario.datos ? <CheckIcon /> : <CloseIcon />}
                              </Flex>
                              <Flex
                                w={"100%"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                p={"1"}
                              >
                                <AlertDialogueDelete
                                  title="Eliminar usuario"
                                  text={`¿Estas seguro que deseas eliminar a ${usuario.name}?`}
                                  textBtn="Eliminar"
                                  logo={<FiTrash2 />}
                                  metodo={usuario}
                                  handleDeleteFunction={handleDeleteUser}
                                />
                              </Flex>
                            </Flex>
                          </Flex>
                        ))}
                      </>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default VistaHomeSuperUser;
