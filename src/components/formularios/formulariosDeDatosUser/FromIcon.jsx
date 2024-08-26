import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import logo from "../../../images/logo.png";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const FormIcon = () => {
  const fileInputRef = useRef();
  const [imagenUser, setImagenUser] = useState(null);
  const toast = useToast();
  const rutaMain = "/api/imagenPerfil/";

  const handleImagen = async (imagen) => {
    const image = { imagen };
    console.log(image);

    // Primero creo el form data
    const bodyFormData = new FormData();

    for (const key in image) {
      bodyFormData.append(key, image[key]);
    }

    const response = await axios.post("/api/imagenPerfil", bodyFormData);
    console.log(response);
    handleGetImagen();
  };

  const handleGetImagen = async () => {
    const { data } = await axios.get("/api/imagenPerfil");

    setImagenUser(data.imagen[0]);
  };

  useEffect(() => {
    handleGetImagen();
  }, [setImagenUser]);

  const handleDeleteImagen = async () => {
    try {
      await axios.delete(
        `/api/imagenPerfil/${imagenUser.imagen}/${imagenUser.id}`
      );
      toast({
        title: "Advertencia",
        description: "Imagen Eliminada",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      handleGetImagen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeImagen = async (imagen) => {
    const image = { imagen };
    console.log(image);

    // Primero creo el form data
    const bodyFormData = new FormData();

    for (const key in image) {
      bodyFormData.append(key, image[key]);
    }

    const response = await axios.patch(
      `/api/imagenPerfil/${imagenUser.imagen}/${imagenUser.id}`,
      bodyFormData
    );
    console.log(response);
    handleGetImagen();
  };

  return (
    <Stack
      spacing={4}
      w={"full"}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      boxShadow={"xs"}
      p={4}
      border="solid 1px"
    >
      <FormControl id="userName">
        <FormLabel>Foto de Perfil</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              src={imagenUser ? rutaMain + imagenUser.imagen : logo}
            >
              {imagenUser ? (
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<CloseIcon />}
                  onClick={handleDeleteImagen}
                />
              ) : (
                <div></div>
              )}
            </Avatar>
          </Center>
          <Center w="full">
            <Input
              ref={fileInputRef}
              display="none"
              type="file"
              onChange={
                imagenUser
                  ? (target) => handleChangeImagen(target.target.files[0])
                  : (target) => handleImagen(target.target.files[0])
              }
            />
            <Button w="2/4" onClick={() => fileInputRef.current.click()}>
              Cambiar Foto
            </Button>
          </Center>
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default FormIcon;
