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
import React, { useState } from "react";

import FromCrearMetodo from "./FromCrearMetodo";

export const ModalCrearMetodo = ({ title, handleGetMetodos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const [typeMetodo, setTypeMetodo] = useState("");

  const cleanAndClose = () => {
    setTypeMetodo("");
    onClose();
  };

  const renderSwitch = (key) => {
    switch (key) {
      case "digital":
        return (
          <FromCrearMetodo
            typeMetodo={typeMetodo}
            onClose={onClose}
            handleGetMetodos={handleGetMetodos}
          />
        );

      case "fisico":
        return (
          <FromCrearMetodo
            typeMetodo={typeMetodo}
            onClose={onClose}
            handleGetMetodos={handleGetMetodos}
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
              onChange={({ target }) => setTypeMetodo(target.value)}
            >
              <option value="">Seleccione un metodo de pago</option>
              <option value="digital">Digital</option>
              <option value="fisico">Fisico</option>
            </Select>
            <div>{renderSwitch(typeMetodo)}</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCrearMetodo;
