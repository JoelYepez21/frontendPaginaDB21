import {
  Avatar,
  AvatarBadge,
  ButtonGroup,
  CircularProgress,
  Flex,
  IconButton,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import { CloseIcon, ViewIcon } from "@chakra-ui/icons";
import AlertDialogueDelete from "./AlertDeleteUser";
import ModalUser from "../modales/superUser/Modal";
import { FiTrash2 } from "react-icons/fi";
// vista de usuarios para el admi
export const VistaUsuarios = () => {
  const [usuarios, setUsuarios] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [datos, setDatos] = React.useState([]);
  const [unidad, setUnidad] = useState("");
  const [genero, setGenero] = useState("");
  const [isLoading, setIsloading] = useState(!users ? false : true);
  const toast = useToast();
  const rutaMain = "/api/imagenPerfil/";
  // funcion para el filtro
  useEffect(() => {
    const handleFiltro = async () => {
      if (genero !== "" && unidad === "") {
        return setUsuarios(
          users.filter((user) => user.datos.genero === genero)
        );
      } else if (genero === "" && unidad !== "") {
        return setUsuarios(
          users.filter((user) => user.datos.unidad === unidad)
        );
      } else if (genero !== "" && unidad !== "") {
        return setUsuarios(
          users.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else {
        setUsuarios(users);
      }
    };

    handleFiltro();
  }, [genero, setUsuarios, unidad, users, usuarios]);
  // funcion para obtener los usuarios
  const handleGetUsuarios = async () => {
    const { data } = await axios.get("/api/datos");
    setUsers(
      data.user.sort((a, b) => {
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
    setDatos(data.datos);
    setIsloading(false);
  };
  useEffect(() => {
    handleGetUsuarios();
  }, [setUsers]);
  // funcion para eliminar los usuarios
  const handleDeleteUser = async (usuarioEsperado) => {
    setUsuarios(usuarios.filter((usuario) => usuarioEsperado.id != usuario.id));
    await axios.delete(`/api/users/${usuarioEsperado.id}`);
    toast({
      title: "Usuario Eliminado",
      description: "",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetUsuarios();
  };
  // funcion para eliminar la imagen de perfil
  const handleDeleteImagen = async (nombre, id) => {
    try {
      await axios.delete(`/api/imagenPerfil/${nombre}/${id}`);
      toast({
        title: "Advertencia",
        description: "Imagen Eliminada",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleGetUsuarios();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex flexDirection="column" w="100%">
      <Flex gap="4" p="4">
        <Select
          border="solid 1px"
          onChange={({ target }) => setUnidad(target.value)}
        >
          <option value="">Unidad</option>
          <option value="Manada">Manada</option>
          <option value="Tropa">Tropa</option>
          <option value="Clan">Clan</option>
        </Select>
        <Select
          border="solid 1px"
          onChange={({ target }) => setGenero(target.value)}
        >
          <option value="">Genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </Select>
      </Flex>

      <Flex
        p="4"
        rounded="12"
        gap="4"
        flexDirection="row"
        justifyContent="center"
        flexWrap="wrap"
        maxH="75vh"
        overflow="scroll"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isLoading ? (
          <Flex
            w="100%"
            minH="60vh"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              isIndeterminate
              color="yellow.300"
              thickness="8px"
              size="xs"
            />
          </Flex>
        ) : usuarios.length === 0 ? (
          <Text>No hay ningun usuario</Text>
        ) : (
          usuarios.map((usuario) => (
            <Flex
              bg={useColorModeValue("white", "gray.800")}
              direction="row"
              w={{ base: "85%", lg: "48%", xl: "40%", "2xl": "30%" }}
              justifyContent="center"
              rounded="xl"
              key={usuario.name}
              id={usuario.id}
            >
              <Flex w="20%" display={{ base: "none", sm: "flex" }}>
                <Avatar
                  size={"xl"}
                  alignSelf="center"
                  src={usuario.imagen ? rutaMain + usuario.imagen.imagen : logo}
                >
                  {usuario.imagen ? (
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<CloseIcon />}
                      onClick={() =>
                        handleDeleteImagen(
                          usuario.imagen.imagen,
                          usuario.imagen.id
                        )
                      }
                    />
                  ) : (
                    <div></div>
                  )}
                </Avatar>
              </Flex>
              <Flex
                direction="column"
                w={{ base: "100%", md: "70%" }}
                p="4"
                alignItems="center"
                gap="4"
              >
                <Text fontSize="2xl">{usuario.name}</Text>
                <ButtonGroup>
                  <ModalUser
                    usuarioPasado={usuario}
                    datosPasados={datos}
                    handleGetUsuarios={handleGetUsuarios}
                    logo={<ViewIcon />}
                    message="Los Datos han sido borrados"
                  />
                  <AlertDialogueDelete
                    title="Eliminar usuario"
                    text={`¿Estas seguro que deseas eliminar a ${usuario.name}?`}
                    textBtn="Eliminar"
                    logo={<FiTrash2 />}
                    metodo={usuario}
                    handleDeleteFunction={handleDeleteUser}
                  />
                </ButtonGroup>
              </Flex>
            </Flex>
          ))
        )}
      </Flex>
    </Flex>
  );
};

export default VistaUsuarios;
