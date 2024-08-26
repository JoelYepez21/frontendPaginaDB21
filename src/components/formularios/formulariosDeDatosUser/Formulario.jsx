import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

export const Formulario = ({ hanldeGetDatos }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const REGEX_NUMBER = /^[0](212|412|414|424|416|426)[0-9]{7}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*[ ][A-Z][a-z]*[ ][A-Z][a-z]*$/;
  const { auth } = useAuth();
  const toast = useToast();
  // const [editable, setEditable] = useBoolean();
  // const [datos, setDatos] = useState("");

  const [cedula, setCedula] = useState("");
  const [cedulaValidation, setCedulaValidation] = useState(false);

  const [nombres, setNombres] = useState("");
  const [nombresValidation, setNombresValidation] = useState(false);

  const [genero, setGenero] = useState("");
  const [generoValidation, setGeneroValidation] = useState(false);

  const [fecha, setFecha] = useState("");
  const [edad, setEdad] = useState("");
  const [fechaValidation, setFechaValidation] = useState(false);

  const [telefonoPersonal, setTelefonoPersonal] = useState("");
  const [telefonoPersonalValidation, setTelefonoPersonalValidation] =
    useState(false);

  const [telefonoLocal, setTelefonoLocal] = useState("");
  const [telefonoLocalValidation, setTelefonoLocalValidation] = useState(false);

  const [unidad, setUnidad] = useState("");
  const [unidadValidation, setUnidadValidation] = useState(false);

  const [direccion, setDireccion] = useState("");
  // const [direccionValidation, setDireccionValidation] = useState(false);

  useEffect(() => {
    if (cedula > 3000000 && cedula < 45000000) {
      setCedulaValidation(true);
    } else {
      setCedulaValidation(false);
    }
  }, [cedula]);

  useEffect(() => {
    setNombresValidation(REGEX_NAME.test(nombres));
  }, [REGEX_NAME, nombres]);

  useEffect(() => {
    if (genero === "default") {
      setGeneroValidation(false);
    } else {
      setGeneroValidation(true);
    }
  }, [genero]);

  useEffect(() => {
    function calcularEdad(fecha) {
      // Si la fecha es correcta, calculamos la edad

      let values = fecha.split("-");
      let dia = values[2];
      let mes = values[1];
      let ano = values[0];

      // cogemos los valores actuales
      let fecha_hoy = new Date();
      let ahora_ano = fecha_hoy.getYear();
      let ahora_mes = fecha_hoy.getMonth() + 1;
      let ahora_dia = fecha_hoy.getDate();

      // realizamos el calculo
      let edad = ahora_ano + 1900 - ano;
      if (ahora_mes < mes) {
        edad--;
      }
      if (mes == ahora_mes && ahora_dia < dia) {
        edad--;
      }
      if (edad > 1900) {
        edad -= 1900;
      }

      // calculamos los meses
      let meses = 0;

      if (ahora_mes > mes && dia > ahora_dia) meses = ahora_mes - mes - 1;
      else if (ahora_mes > mes) meses = ahora_mes - mes;
      if (ahora_mes < mes && dia < ahora_dia) meses = 12 - (mes - ahora_mes);
      else if (ahora_mes < mes) meses = 12 - (mes - ahora_mes + 1);
      if (ahora_mes == mes && dia > ahora_dia) meses = 11;

      // calculamos los dias
      let dias = 0;
      if (ahora_dia > dia) dias = ahora_dia - dia;
      if (ahora_dia < dia) {
        const ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
      }

      if (
        edad >= 7 &&
        meses >= 0 &&
        dias > 0 &&
        edad < 21 &&
        meses <= 12 &&
        dias < 30
      ) {
        setFechaValidation(true);
      } else {
        setFechaValidation(false);
      }
      const edadCompleta = edad + " años con " + meses + " meses";
      setEdad(edadCompleta);
      return setFechaValidation;
    }
    calcularEdad(fecha);
  }, [fecha, edad]);
  useEffect(() => {
    setTelefonoPersonalValidation(REGEX_NUMBER.test(telefonoPersonal));
  }, [REGEX_NUMBER, telefonoPersonal]);

  useEffect(() => {
    setTelefonoLocalValidation(REGEX_NUMBER.test(telefonoLocal));
  }, [REGEX_NUMBER, telefonoLocal]);

  useEffect(() => {
    if (unidad === "unidad") {
      setUnidadValidation(false);
    } else {
      setUnidadValidation(true);
    }
  }, [unidad]);

  const handleDatos = async () => {
    try {
      const { data } = await axios.post("/api/datos", {
        cedula,
        nombres,
        genero,
        fecha,
        edad,
        telefonoPersonal,
        telefonoLocal,
        unidad,
        direccion,
      });
      await axios.patch(`/api/users/${auth.id}`, { registrado: true });
      toast({
        title: "Datos Enviados",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      hanldeGetDatos();
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
    <>
      <FormControl w="18rem" isInvalid={!cedulaValidation && cedula}>
        <FormLabel>Numero de cedula</FormLabel>

        <Input
          type="number"
          border="solid 1px"
          value={cedula}
          onChange={({ target }) => setCedula(target.value)}
        />

        {/* <Input
          type="number"
          border="solid 1px"
          value={auth.registrado ? datos.cedula : cedula}
          onChange={({ target }) => setCedula(target.value)}
          isDisabled={auth.registrado}
        /> */}
      </FormControl>
      <FormControl w="18rem" isInvalid={!nombresValidation && nombres}>
        <FormLabel>Nombres y Apellidos</FormLabel>

        <Input
          type="text"
          border="solid 1px"
          value={nombres}
          onChange={({ target }) => setNombres(target.value)}
        />
      </FormControl>
      <FormControl w="18rem" isInvalid={!generoValidation && genero}>
        <FormLabel>Genero</FormLabel>

        <Select
          value={genero}
          border="solid 1px"
          onChange={({ target }) => setGenero(target.value)}
        >
          <option value="default">Seleccione un genero</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </Select>
      </FormControl>
      <FormControl w="18rem" isInvalid={!fechaValidation && fecha}>
        <FormLabel>Fecha de Nacimiento</FormLabel>

        <Input
          w="18rem"
          type="date"
          border="solid 1px"
          value={fecha}
          onChange={({ target }) => setFecha(target.value)}
        />
      </FormControl>
      <FormControl
        w="18rem"
        isInvalid={!telefonoPersonalValidation && telefonoPersonal}
      >
        <FormLabel>Telefono Personal</FormLabel>

        <Input
          w="18rem"
          type="number"
          border="solid 1px"
          value={telefonoPersonal}
          onChange={({ target }) => setTelefonoPersonal(target.value)}
        />
      </FormControl>
      <FormControl
        w="18rem"
        isInvalid={!telefonoLocalValidation && telefonoLocal}
      >
        <FormLabel>Telefono Local</FormLabel>
        <Input
          w="18rem"
          type="number"
          border="solid 1px"
          value={telefonoLocal}
          onChange={({ target }) => setTelefonoLocal(target.value)}
        />
      </FormControl>
      <FormControl w="18rem">
        <FormLabel>Correo Electronico</FormLabel>
        <Input w="18rem" border="solid 1px" value={auth.email} disabled />
      </FormControl>
      <FormControl w="18rem" isInvalid={!unidadValidation && unidad}>
        <FormLabel>Unidad</FormLabel>

        <Select
          value={unidad}
          border="solid 1px"
          onChange={({ target }) => setUnidad(target.value)}
        >
          <option value="unidad">Selecciona tu unidad</option>
          <option value="Manada">Manada</option>
          <option value="Tropa">Tropa</option>
          <option value="Clan">Clan</option>
        </Select>
      </FormControl>
      <FormControl w="18rem">
        <FormLabel>Direccion</FormLabel>

        <Input
          w="18rem"
          placeholder="Direccion de habitacion"
          value={direccion}
          border="solid 1px"
          onChange={({ target }) => setDireccion(target.value)}
        />
      </FormControl>
      <ButtonGroup
        w="18rem"
        display="flex"
        alignItems="end"
        justifyContent="center"
      >
        <Button onClick={handleDatos} colorScheme="green">
          Guardar datos
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Formulario;
