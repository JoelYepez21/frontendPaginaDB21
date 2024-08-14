import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import FromCrearMetodo from "./FromCrearMetodo";

export const ModalEditMetodo = ({ title, metodoPasado }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const [typeMetodo, setTypeMetodo] = useState(metodoPasado.typeMetodo);

  const cleanAndClose = () => {
    setTypeMetodo("");
    onClose();
  };

  const renderSwitch = (key) => {
    switch (key) {
      case "digital":
        return <FromCrearMetodo typeMetodo={typeMetodo} onClose={onClose} />;

      case "fisico":
        return <FromCrearMetodo typeMetodo={typeMetodo} onClose={onClose} />;
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
            <div>{renderSwitch(typeMetodo)}</div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditMetodo;
