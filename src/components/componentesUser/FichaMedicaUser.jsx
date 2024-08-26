import {
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  FormControl,
  Input,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import pdf from "../../assets/pdf/FichaMedica.pdf";
import AlertDialogueDelete from "../componentesSuperUser/AlertDeleteUser";
import { FiTrash2 } from "react-icons/fi";

export const VistaFichaMedicaUser = () => {
  const [pdfUser, setPdfUser] = useState(null);
  const fileInputRef = useRef();
  const fileLinkRef = useRef();
  const fileLinkRefMain = useRef();
  const fileInputRefPost = useRef();
  const rutaMain = "/api/uploads/";
  const [isLoading, setIsloading] = useState(pdfUser ? false : true);
  const toast = useToast();
  // funcion para enviar el pdf
  const handleImagen = async (pdfFile) => {
    try {
      const pdf = { pdfFile };
      console.log(pdf);

      // Primero creo el form data
      const bodyFormData = new FormData();
      // agrago el pdf al form data
      for (const key in pdf) {
        bodyFormData.append(key, pdf[key]);
      }
      //envio el form data
      await axios.post("/api/pdffiles", bodyFormData);
      handleGetPdf();
      toast({
        title: "Ficha medica agregada",
        description: "Se ha subido la ficha medica con exito",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Advertencia",
        description: "Ha ocurrido en subir tu ficha medica",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  // funcion para obtener el pdf
  const handleGetPdf = async () => {
    const { data } = await axios.get("/api/pdffiles");
    setPdfUser(data.Pdf[0]);
    setIsloading(false);
  };

  useEffect(() => {
    handleGetPdf();
  }, [setPdfUser]);
  // funcion para cambiar el pdf
  const handleChangeFile = async (pdfFile) => {
    try {
      const pdf = { pdfFile };
      console.log(pdf);

      // Primero creo el form data
      const bodyFormData = new FormData();
      // agrago el pdf al form data
      for (const key in pdf) {
        bodyFormData.append(key, pdf[key]);
      }
      //envio el form data
      await axios.patch(
        `/api/pdffiles/${pdfUser.pdfFile}/${pdfUser.id}`,
        bodyFormData
      );

      handleGetPdf();
      toast({
        title: "Ficha medica actualizada",
        description: "Se ha subido la ficha medica con exito",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Advertencia",
        description: "Se ha subido la ficha medica con exito",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  // funcion para eliminar el pdf
  const handleDeletePdf = async (pdf) => {
    try {
      console.log(pdf);

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
      direction="column"
      gap="4"
      justifyContent="center"
      alignItems="center"
      rounded="xl"
      border={{ base: "1px", md: "0px" }}
    >
      {pdfUser ? (
        <Flex>
          <Flex
            display={{ base: "flex", md: "none" }}
            direction="column"
            w={{ base: "100%", md: "70%" }}
            p="4"
            alignItems="center"
            gap="4"
          >
            <Text fontSize="2xl">Mi ficha medica</Text>
            <Text fontSize="xl">{pdfUser.pdfFile.split("-")[1]}</Text>
            <Flex gap="4" alignItems="center">
              <FormControl
                display="flex"
                gap="4"
                justifyContent="center"
                alignItems="center"
              >
                <Input
                  ref={fileInputRef}
                  display="none"
                  type="file"
                  onChange={(target) =>
                    handleChangeFile(target.target.files[0])
                  }
                />
                <Button onClick={() => fileInputRef.current.click()}>
                  Cambiar
                </Button>

                <Button
                  onClick={() => fileLinkRef.current.click()}
                  colorScheme="blue"
                >
                  Ver
                </Button>
                <Link
                  display="none"
                  isExternal
                  download
                  ref={fileLinkRef}
                  href={rutaMain + pdfUser.pdfFile}
                />
                <AlertDialogueDelete
                  title="Eliminar ficha medica"
                  text={`¿Estas seguro que deseas eliminar tu ficha medica ?`}
                  textBtn="Eliminar"
                  logo={<FiTrash2 />}
                  metodo={pdfUser}
                  handleDeleteFunction={handleDeletePdf}
                />
              </FormControl>
            </Flex>
          </Flex>
          <Flex display={{ base: "none", md: "block" }} p="4">
            <iframe
              src={pdfUser ? rutaMain + pdfUser.pdfFile : pdf}
              width={510}
              height={570}
            ></iframe>
            <FormControl p="4" display="flex" justifyContent="center">
              <Input
                ref={fileInputRef}
                display="none"
                type="file"
                onChange={(target) => handleChangeFile(target.target.files[0])}
              />
              <ButtonGroup>
                <Button onClick={() => fileInputRef.current.click()}>
                  Cambiar
                </Button>{" "}
                <AlertDialogueDelete
                  title="Eliminar ficha medica"
                  text={`¿Estas seguro que deseas eliminar tu ficha medica ?`}
                  textBtn="Eliminar"
                  logo={<FiTrash2 />}
                  metodo={pdfUser}
                  handleDeleteFunction={handleDeletePdf}
                />
              </ButtonGroup>
            </FormControl>
          </Flex>
        </Flex>
      ) : (
        <FormControl
          display="flex"
          flexDirection="column"
          gap="4"
          justifyContent="center"
          alignItems="center"
          p="4"
        >
          <Text fontSize="2xl">Ficha medica</Text>
          <Text fontSize="xl" display={{ base: "block", md: "none" }}>
            {pdf.split("/")[4]}
          </Text>
          <Flex display={{ base: "none", md: "block" }}>
            <iframe src={pdf} width={510} height={570}></iframe>
          </Flex>

          <Input
            type="file"
            ref={fileInputRefPost}
            display="none"
            onChange={({ target }) => handleImagen(target.files[0])}
          />
          <ButtonGroup>
            <Button
              onClick={() => fileLinkRefMain.current.click()}
              colorScheme="blue"
            >
              Descargar
            </Button>
            <Button onClick={() => fileInputRefPost.current.click()}>
              Agregar
            </Button>

            <Link
              display="none"
              isExternal
              download
              ref={fileLinkRefMain}
              href={pdf}
            />
          </ButtonGroup>
        </FormControl>
      )}
    </Flex>
  );
};
export default VistaFichaMedicaUser;
