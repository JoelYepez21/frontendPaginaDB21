import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import AlertDialogueDelete from "../../componentesSuperUser/AlertDeleteUser";
import React from "react";
import axios from "axios";

export const ModalUser = ({
  usuarioPasado,
  logo,
  datosPasados,
  message,
  handleGetUsuarios,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [dato, setDato] = React.useState([]);

  const handleGet = () => {
    onOpen();
    setDato(datosPasados.find((datos) => datos.user === usuarioPasado.id));
  };

  const handleDeleteDatos = async () => {
    onClose();
    await axios.delete(`/api/datos/${dato.id}`);
    usuarioPasado.registrado = false;
    await axios.patch(`/api/users/${usuarioPasado.id}`, { registrado: false });
    toast({
      title: "Advertencia",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    handleGetUsuarios();
  };
  return (
    <>
      <Button onClick={handleGet} colorScheme="green">
        {logo}
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{dato.nombres}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Nro. de Cedula: {dato.cedula}</Text>
            <Text>Correo Electronico: {usuarioPasado.email}</Text>
            <Text>Genero: {dato.genero}</Text>
            <Text>Fecha de Nacimiento: {dato.fechaNacimiento}</Text>
            <Text>Edad: {dato.edad}</Text>
            <Text>Telefono Personal: {dato.telefonoPersonal}</Text>
            <Text>Telefono Local: {dato.telefonoLocal}</Text>
            <Text>Unidad: {dato.unidad}</Text>
            <Text>Direccion: {dato.direccion}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <AlertDialogueDelete
              title="Borrar Datos"
              text="¿Estas seguro que deseas borrar estos datos?"
              textBtn="Borrar"
              dato={dato}
              handleDeleteFunction={handleDeleteDatos}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUser;
