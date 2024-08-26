import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export const FromCrearMetodo = ({ typeMetodo, onClose, handleGetMetodos }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const REGEX_NUMBER = /^[0](212|412|414|424|416|426)[0-9]{7}$/;
  const toast = useToast();
  const [cedula, setCedula] = useState("");
  const [cedulaValidation, setCedulaValidation] = useState(false);

  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);

  const [numero, setNumero] = useState("");
  const [numeroValidation, setnumeroValidation] = useState(false);

  const [cuenta, setCuenta] = useState("");
  const [cuentaValidation, setCuentaValidation] = useState(false);

  const onCloseModal = async () => {
    await onClose();
  };

  useEffect(() => {
    if (cuenta === "none") {
      setCuentaValidation(false);
    } else {
      setCuentaValidation(true);
    }
  }, [cuenta]);

  useEffect(() => {
    setnumeroValidation(REGEX_NUMBER.test(numero));
  }, [REGEX_NUMBER, numero]);

  useEffect(() => {
    if (cedula > 2000000 && cedula < 45000000) {
      setCedulaValidation(true);
    } else {
      setCedulaValidation(false);
    }
  }, [cedula]);

  useEffect(() => {
    if (name != "") {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  }, [name]);
  const handleCrearMetodo = async () => {
    if (typeMetodo === "digital") {
      try {
        const { data } = await axios.post("/api/metodos", {
          name,
          cedula,
          numero,
          typeMetodo,
          cuenta,
        });

        toast({
          title: "Usuario Creado",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        onCloseModal();
        typeMetodo === "";
        handleGetMetodos();
      } catch (error) {
        console.log(error);
        toast({
          title: "Advertencia",
          description: error.response.data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } else if (typeMetodo === "fisico") {
      try {
        const { data } = await axios.post("/api/metodos", {
          name,
          cedula,
          numero,
          typeMetodo,
          cuenta,
        });
        toast({
          title: "Usuario Creado",
          description: data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        onCloseModal();
        typeMetodo === "";
        handleGetMetodos();
        // setMetodos([...metodos, { name, typeMetodo }]);
      } catch (error) {
        console.log(error);
        toast({
          title: "Advertencia",
          description: error.response.data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  return (
    <>
      {typeMetodo === "digital" ? (
        <Flex direction="column" gap="4">
          <FormControl isInvalid={!nameValidation && name}>
            <FormLabel>Nombre del Metodo:</FormLabel>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </FormControl>
          <FormControl isInvalid={!cuentaValidation && cuenta}>
            <FormLabel>Banco:</FormLabel>
            <Select
              value={cuenta}
              onChange={({ target }) => setCuenta(target.value)}
            >
              <option value="none">Seleccione un banco</option>
              <option value="0156-100%BANCO">100%BANCO</option>
              <option value="0196-ABN AMRO BANK">ABN AMRO BANK</option>
              <option value="0172-BANCAMIGA BANCO MICROFINANCIERO, C.A.">
                BANCAMIGA BANCO MICROFINANCIERO, C.A.
              </option>
              <option value="0171-BANCO ACTIVO BANCO COMERCIAL, C.A.">
                BANCO ACTIVO BANCO COMERCIAL, C.A.
              </option>
              <option value="0166-BANCO AGRICOLA">BANCO AGRICOLA</option>
              <option value="0175-BANCO BICENTENARIO">
                BANCO BICENTENARIO
              </option>
              <option value="0128-BANCO CARONI, C.A. BANCO UNIVERSAL">
                BANCO CARONI, C.A. BANCO UNIVERSAL
              </option>
              <option value="0164-BANCO DE DESARROLLO DEL MICROEMPRESARIO">
                BANCO DE DESARROLLO DEL MICROEMPRESARIO
              </option>
              <option value="0102-BANCO DE VENEZUELA S.A.I.C.A.">
                BANCO DE VENEZUELA S.A.I.C.A.
              </option>
              <option value="0114-BANCO DEL CARIBE C.A.">
                BANCO DEL CARIBE C.A.
              </option>
              <option value="0149-BANCO DEL PUEBLO SOBERANO C.A.">
                BANCO DEL PUEBLO SOBERANO C.A.
              </option>
              <option value="0163-BANCO DEL TESORO">BANCO DEL TESORO</option>
              <option value="0176-BANCO ESPIRITO SANTO, S.A.">
                BANCO ESPIRITO SANTO, S.A.
              </option>
              <option value="0115-BANCO EXTERIOR C.A">
                BANCO EXTERIOR C.A.
              </option>
              <option value="0003-BANCO INDUSTRIAL DE VENEZUELA">
                BANCO INDUSTRIAL DE VENEZUELA.
              </option>
              <option value="0173-BANCO INTERNACIONAL DE DESARROLLO, C.A.">
                BANCO INTERNACIONAL DE DESARROLLO, C.A.
              </option>
              <option value="0105-BANCO MERCANTIL C.A.">
                BANCO MERCANTIL C.A.
              </option>
              <option value="0191-BANCO NACIONAL DE CREDITO">
                BANCO NACIONAL DE CREDITO
              </option>
              <option value="0116-BANCO OCCIDENTAL DE DESCUENTO.">
                BANCO OCCIDENTAL DE DESCUENTO.
              </option>
              <option value="0138-BANCO PLAZA">BANCO PLAZA</option>
              <option value="0108-BANCO PROVINCIAL BBVA">
                BANCO PROVINCIAL BBVA
              </option>
              <option value="0104-BANCO VENEZOLANO DE CREDITO S.A.">
                BANCO VENEZOLANO DE CREDITO S.A.
              </option>
              <option value="0168-BANCRECER S.A. BANCO DE DESARROLLO">
                BANCRECER S.A. BANCO DE DESARROLLO
              </option>
              <option value="0134-BANESCO BANCO UNIVERSAL">
                BANESCO BANCO UNIVERSAL
              </option>
              <option value="0177-BANFANB">BANFANB</option>
              <option value="0146-BANGENTE">BANGENTE</option>
              <option value="0174-BANPLUS BANCO COMERCIAL C.A">
                BANPLUS BANCO COMERCIAL C.A
              </option>
              <option value="0190-CITIBANK.">CITIBANK.</option>
              <option value="0121-CORP BANCA.">CORP BANCA.</option>
              <option value="0157-DELSUR BANCO UNIVERSAL">
                DELSUR BANCO UNIVERSAL
              </option>
              <option value="0151-FONDO COMUN">FONDO COMUN</option>
              <option value="0601-INSTITUTO MUNICIPAL DE CR&#201;DITO POPULAR">
                INSTITUTO MUNICIPAL DE CR&#201;DITO POPULAR
              </option>
              <option value="0169-MIBANCO BANCO DE DESARROLLO, C.A.">
                MIBANCO BANCO DE DESARROLLO, C.A.
              </option>
              <option value="0137-SOFITASA">SOFITASA</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={!numeroValidation && numero}>
            <FormLabel>Numero de telefono afiliado:</FormLabel>
            <Input
              type="number"
              value={numero}
              onChange={({ target }) => setNumero(target.value)}
            />
          </FormControl>
          <FormControl isInvalid={!cedulaValidation && cedula}>
            <FormLabel>Numero de cedula afiliado:</FormLabel>
            <Input
              type="number"
              value={cedula}
              onChange={({ target }) => setCedula(target.value)}
            />
          </FormControl>
          <Button onClick={handleCrearMetodo}>Crear</Button>
        </Flex>
      ) : (
        <Flex direction="column" gap="4">
          <FormControl isInvalid={!nameValidation && name}>
            <FormLabel>Nombre del Metodo:</FormLabel>
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </FormControl>
          <Button onClick={handleCrearMetodo}>Crear</Button>
        </Flex>
      )}
    </>
  );
};

export default FromCrearMetodo;
