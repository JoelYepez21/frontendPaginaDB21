import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const FromPagoMovil = ({ metodoPasado, onClose, handleGetPago }) => {
  const [metodo, setMetodo] = useState("");
  const [referencia, setReferencia] = useState("");
  const [monto, setMonto] = useState("");
  const fechaPago = new Date();
  const toast = useToast();

  useEffect(() => {
    const handleGetMetodos = async () => {
      const { data } = await axios.get(`/api/metodos/${metodoPasado}`);
      setMetodo(data[0]);
    };

    handleGetMetodos();
  }, [metodoPasado, setMetodo]);

  const onCloseModal = async () => {
    await onClose();
  };

  const handlePagar = async () => {
    try {
      const fecha = fechaPago.toLocaleDateString();
      setMonto(monto + "bs");
      console.log(monto);
      const { data } = await axios.post("/api/pagos", {
        fecha,
        referencia,
        monto,
        metodo,
      });
      toast({
        title: "Pago Enviado",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onCloseModal();
      handleGetPago();
    } catch (error) {
      toast({
        title: "Advertencia",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      {metodo.typeMetodo === "digital" ? (
        <Flex direction="column" gap="4">
          <Flex direction="column" border="solid white 1px" rounded="lg" p="4">
            <Heading fontSize="xl">Datos:</Heading>
            <Flex justifyContent="space-between" direction="column">
              <Text>V- {metodo.cedula}</Text>
              <Text>{metodo.cuenta}</Text>
              <Text>{metodo.numero}</Text>
            </Flex>
          </Flex>
          <FormControl>
            <FormLabel>Numero de referencia:</FormLabel>
            <Input
              placeholder="Ultimos 4 digitos"
              type="number"
              value={referencia}
              onChange={({ target }) => setReferencia(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Monto en bs:</FormLabel>
            <Input
              placeholder="Si tiene decimales separar con una ,"
              type="number"
              value={monto}
              onChange={({ target }) => setMonto(target.value)}
            />
          </FormControl>
          <ButtonGroup
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button colorScheme="blue" mr={3} onClick={handlePagar}>
              Pagar
            </Button>
          </ButtonGroup>
        </Flex>
      ) : (
        <Flex direction="column" gap="4">
          <FormControl>
            <FormLabel>Dirigente a quien se lo entrego:</FormLabel>
            <Select
              placeholder=""
              type="text"
              onChange={({ target }) => setReferencia(target.value)}
            >
              <option value="">Seleccione un dirigente</option>
              <option value="Julio Gomez">Julio Gomez</option>
              <option value="Sofia Mendoza">Sofia Mendoza</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Monto en $:</FormLabel>
            <Input
              placeholder=""
              type="number"
              value={monto}
              onChange={({ target }) => setMonto(target.value)}
            />
          </FormControl>
          <ButtonGroup
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button colorScheme="blue" mr={3} onClick={handlePagar}>
              Pagar
            </Button>
          </ButtonGroup>
        </Flex>
      )}
    </>
  );
};

export default FromPagoMovil;
