// import  FocusLock from "react-focus-lock"

import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FocusLock,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

// 1. Create a text input component

// eslint-disable-next-line react/display-name, react-refresh/only-export-components

// 2. Create the form
// eslint-disable-next-line react-refresh/only-export-components
const Form = ({ metodo, onCancel, getMetodos }) => {
  const toast = useToast();
  const [name, setName] = useState(metodo.name);

  const [cedula, setCedula] = useState(metodo.cedula);

  const [numero, setNumero] = useState(metodo.numero);

  const [cuenta, setCuenta] = useState(metodo.cuenta);

  const handleUpdateMetodos = async () => {
    try {
      await axios.patch(`/api/metodos/${metodo.id}/${metodo.typeMetodo}`, {
        name,
        cedula,
        numero,
        cuenta,
      });
      toast({
        title: "Metodo Actualizado",
        description: "El metodo ha sido actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      getMetodos();
      onCancel();
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
  };
  return (
    <Stack spacing={4}>
      {metodo.typeMetodo === "fisico" ? (
        <FormControl>
          <FormLabel htmlFor={metodo.id}>Nombre</FormLabel>
          <Input
            id={metodo.id}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </FormControl>
      ) : (
        <FormControl>
          <FormLabel htmlFor={metodo.id}>Nombre</FormLabel>
          <Input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <FormLabel htmlFor={metodo.id}>Banco</FormLabel>
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
            <option value="0175-BANCO BICENTENARIO">BANCO BICENTENARIO</option>
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
            <option value="0115-BANCO EXTERIOR C.A">BANCO EXTERIOR C.A.</option>
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
          <FormLabel htmlFor={metodo.id}>Numero</FormLabel>
          <Input
            type="number"
            value={numero}
            onChange={({ target }) => setNumero(target.value)}
          />
          <FormLabel htmlFor={metodo.id}>Cedula</FormLabel>
          <Input
            type="number"
            value={cedula}
            onChange={({ target }) => setCedula(target.value)}
          />
        </FormControl>
      )}
      ;
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={handleUpdateMetodos}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverForm = ({ metodo, getMetodos }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="lg" colorScheme="teal" icon={<EditIcon />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form metodo={metodo} onCancel={onClose} getMetodos={getMetodos} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

// eslint-disable-next-line no-undef
export default PopoverForm;
