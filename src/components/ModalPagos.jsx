import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FromPagoMovil from "./FromPagoMovil";
import axios from "axios";
// import FromPagoEfectivo from "./FromPagoEfectivo";

export const ModalPagos = ({ title, handleGetPago }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [metodo, setMetodo] = useState("");
  const [metodos, setMetodos] = React.useState([]);

  const cleanAndClose = () => {
    setMetodo("");
    onClose();
  };

  const handleGetMetodos = async () => {
    const { data } = await axios.get("/api/metodos/");
    setMetodos(data);
  };

  useEffect(() => {
    handleGetMetodos();
  }, [setMetodos]);
  console.log(metodos);

  const renderSwitch = (key) => {
    switch (key) {
      case "Pago Movil":
        return (
          <FromPagoMovil
            metodoPasado={key}
            handleGetPago={handleGetPago}
            onClose={onClose}
          />
        );

      case "Divisas":
        return (
          <FromPagoMovil
            metodoPasado={key}
            handleGetPago={handleGetPago}
            onClose={onClose}
          />
        );

      default:
        return <div>No has seleccionado un metodo de pago</div>;
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        {title}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={cleanAndClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display="flex" flexDirection="column" gap="4">
            <Select
              ref={initialRef}
              border="solid 1px"
              onChange={({ target }) => setMetodo(target.value)}
            >
              <option value="default">Seleccione un metodo de pago</option>
              {metodos.map((metodo) => (
                <option value={metodo.name} key={metodo.id}>
                  {metodo.name}
                </option>
              ))}
            </Select>
            <div>{renderSwitch(metodo)}</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPagos;
