import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
// componente para hacer las acciones de borrar o confirmar
const AlertDialogueDelete = ({
  handleDeleteFunction,
  title,
  logo,
  text,
  textBtn,
  metodo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [color, setColor] = useState("");

  const handleDelete = async () => {
    if (metodo) {
      await handleDeleteFunction(metodo);
      onClose();
    } else {
      await handleDeleteFunction();
      onClose();
    }
  };

  useEffect(() => {
    const renderSwitch = async (key) => {
      switch (key) {
        case "Confirmar":
          return setColor("green");

        case "Desconfirmar":
          return setColor("yellow");

        default:
          return setColor("red");
      }
    };
    renderSwitch(textBtn);
  }, [textBtn]);

  return (
    <>
      <Button colorScheme={color} onClick={onOpen}>
        {logo ? logo : title}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{text}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={color} onClick={handleDelete} ml={3}>
                {textBtn}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default AlertDialogueDelete;
