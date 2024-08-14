import {
  Button,
  CircularProgress,
  Flex,
  Link,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import AlertDialogueDelete from "./AlertDeleteUser";
import { ViewIcon } from "@chakra-ui/icons";

export const VistaFichaMedicaSuperUser = () => {
  const [pdfSuperUser, setPdfSuperUser] = React.useState([]);
  const [pdfUsers, setPdfUsers] = React.useState([]);
  const [unidad, setUnidad] = useState("");
  const [genero, setGenero] = useState("");
  const fileLinkRef = useRef();
  const toast = useToast();

  const [isLoading, setIsloading] = useState(!pdfSuperUser ? false : true);
  const rutaMain = "http://localhost:3003/api/uploads/";

  useEffect(() => {
    const handleFiltro = async () => {
      if (genero === "Masculino" && unidad === "") {
        return setPdfSuperUser(
          pdfUsers.filter((user) => user.datos.genero === genero)
        );
      } else if (genero === "Femenino" && unidad === "") {
        return setPdfSuperUser(
          pdfUsers.filter((user) => user.datos.genero === genero)
        );
      } else if (genero === "" && unidad === "Manada") {
        return setPdfSuperUser(
          pdfUsers.filter((user) => user.datos.unidad === unidad)
        );
      } else if (genero === "" && unidad === "Tropa") {
        return setPdfSuperUser(
          pdfUsers.filter((user) => user.datos.unidad === unidad)
        );
      } else if (genero === "" && unidad === "Clan") {
        return setPdfSuperUser(
          pdfUsers.filter((user) => user.datos.unidad === unidad)
        );
      } else if (genero === "Masculino" && unidad === "Clan") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else if (genero === "Femenino" && unidad === "Clan") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else if (genero === "Masculino" && unidad === "Tropa") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else if (genero === "Femenino" && unidad === "Tropa") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else if (genero === "Masculino" && unidad === "Manada") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else if (genero === "Femenino" && unidad === "Manada") {
        return setPdfSuperUser(
          pdfUsers.filter(
            (user) =>
              user.datos.genero === genero && user.datos.unidad === unidad
          )
        );
      } else {
        setPdfSuperUser(pdfUsers);
      }
    };

    handleFiltro();
  }, [genero, pdfUsers, unidad]);

  const handleGetPdf = async () => {
    const { data } = await axios.get("/api/pdffiles");

    setPdfUsers(
      data.Pdf.sort((a, b) => {
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
    handleGetPdf();
  }, [setPdfUsers]);

  const handleDeletePdf = async (pdf) => {
    try {
      setPdfSuperUser(pdfUsers.filter((ficha) => ficha.id != pdf.id));
      await axios.delete(`/api/pdffiles/${pdf.pdfFile}/${pdf.id}`);
      toast({
        title: "Advertencia",
        description: "Ficha medica eliminada",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleGetPdf();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex flexDirection="column" w="100%" gap="4">
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
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap="4"
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
        ) : pdfSuperUser.length === 0 ? (
          <Text>No hay ninguna ficha medica</Text>
        ) : (
          pdfSuperUser.map((pdf) => (
            <Flex
              bg={useColorModeValue("white", "gray.800")}
              direction="row"
              w={{ base: "85%", lg: "48%", xl: "32%", "2xl": "30%" }}
              justifyContent="center"
              rounded="xl"
              key={pdf.pdfFile}
              id={pdf.id}
            >
              <Flex
                direction="column"
                w={{ base: "100%", md: "70%" }}
                p="4"
                alignItems="center"
                gap="4"
              >
                <Text fontSize="2xl">{pdf.user.name}</Text>
                <Flex gap="2" alignItems="center">
                  <Button
                    onClick={() => fileLinkRef.current.click()}
                    colorScheme="blue"
                  >
                    <ViewIcon />
                  </Button>
                  <Link
                    isExternal
                    download
                    display="none"
                    ref={fileLinkRef}
                    href={rutaMain + pdf.pdfFile}
                  >
                    Ver
                  </Link>
                  <AlertDialogueDelete
                    title="Eliminar ficha medica"
                    text={`¿Estas seguro que deseas eliminar a la ficha medica de ${pdf.user.name} ?`}
                    textBtn="Eliminar"
                    logo={<FiTrash2 />}
                    metodo={pdf}
                    handleDeleteFunction={handleDeletePdf}
                  />
                </Flex>
              </Flex>
            </Flex>
          ))
        )}
      </Flex>
    </Flex>
  );
};

// 1723045745107-prueba.pdf
export default VistaFichaMedicaSuperUser;
