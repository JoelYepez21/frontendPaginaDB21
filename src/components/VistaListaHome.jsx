import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";

import AlertDialogueDelete from "./componentesSuperUser/AlertDeleteUser";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";

export const VistaListaHome = ({
  usuarios,
  handleGetUsuarios,
  setUsuarios,
}) => {
  const toast = useToast();

  const handleDeleteUser = async (usuarioEsperado) => {
    console.log(usuarioEsperado);
    setUsuarios(usuarios.filter((usuario) => usuarioEsperado.id != usuario.id));
    await axios.delete(`/api/users/${usuarioEsperado.id}`);
    toast({
      title: "Advertencia",
      description: "Usuario Eliminado",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetUsuarios;
  };

  return (
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
              (<Flex alignItems={"center"} p={"1"}>
                <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                  <Text>Nombre</Text>
                </Flex>
                <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                  <Text>Datos</Text>
                </Flex>
                <Flex w={"100%"} justifyContent={"center"} p={"1"}>
                  <Text>Eliminar</Text>
                </Flex>
              </Flex>)(
                usuarios.map((usuario) => (
                  <Flex key={usuario.name} alignItems={"center"} p={"1"}>
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
                ))
              )
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default VistaListaHome;
