import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// REGEX
// eslint-disable-next-line no-useless-escape
const EMAIL_VALIDATION = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
const PASSWORD_VALIDATION =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const REGEX_NAME =
  /^[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1]+(\s*[A-Z\u00d1][a-zA-Z-ÿí\u00f1\u00d1\s]*)$/;
// console.log(EMAIL_VALIDATION, PASSWORD_VALIDATION);

export const FormRegistro = ({ handleShow }) => {
  const refInput = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfir, setShowPasswordConfir] = useState(false);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const toast = useToast();

  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);

  const [passwordConfir, setPasswordConfir] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);

  const handleNameInput = ({ target }) => {
    setName(target.value);
    setNameValidation(REGEX_NAME.test(name));
  };
  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
    setEmailValidation(EMAIL_VALIDATION.test(email));
  };
  const handlePasswordInput = ({ target }) => {
    setPassword(target.value);
    setPasswordValidation(PASSWORD_VALIDATION.test(password));
  };

  const handlePasswordConfirmation = ({ target }) => {
    setPasswordConfir(target.value);
    setPasswordConfirmation(password === target.value);
  };
  const handleNewUser = async () => {
    try {
      const { data } = await axios.post("/api/users", {
        name,
        email,
        password,
        passwordConfir,
      });
      toast({
        title: "Usuario Creado",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfir("");
      handleShow();
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
      <Heading fontSize="20">
        Regístrate como miembro <br />
        Scout Oficial.
      </Heading>
      <FormControl isInvalid={!nameValidation && name}>
        <FormLabel>Nombre y Apellido</FormLabel>
        <Input
          ref={refInput}
          bg="white"
          type="text"
          color="black"
          value={name}
          required
          onChange={handleNameInput}
        />
        <FormHelperText>
          Tanto el nombre y apellido deben comenzar con mayusculas.
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={!emailValidation && email}>
        <FormLabel>Correo Electronico</FormLabel>
        <Input
          bg="white"
          placeholder="ejemplo@correo.com"
          _placeholder={{ color: "gray" }}
          value={email}
          required
          onChange={handleEmailInput}
          type="email"
          color="black"
        />
        <FormHelperText>Direccion de correo electronico.</FormHelperText>
      </FormControl>
      <FormControl isInvalid={!passwordValidation && password}>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup>
          <Input
            bg="white"
            type={showPassword ? "text" : "password"}
            color="black"
            value={password}
            required
            onChange={handlePasswordInput}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              color={useColorModeValue("black", "black")}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormHelperText>
          Debe tener minimo 5 caracteres <br />
          Debe tener al menos una letra en Mayuscula <br />
          Debe tener al menos un numero <br />
        </FormHelperText>
      </FormControl>
      <FormControl isInvalid={!passwordConfirmation && passwordConfir}>
        <FormLabel>Confirmar Contraseña</FormLabel>
        <InputGroup>
          <Input
            bg="white"
            type={showPasswordConfir ? "text" : "password"}
            value={passwordConfir}
            color="black"
            required
            onChange={handlePasswordConfirmation}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              color={useColorModeValue("black", "black")}
              onClick={() =>
                setShowPasswordConfir(
                  (showPasswordConfir) => !showPasswordConfir
                )
              }
            >
              {showPasswordConfir ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormHelperText>Debe coincidir con la contraseña</FormHelperText>
      </FormControl>
      <ButtonGroup
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4"
      >
        <Button onClick={handleNewUser}>Registrarse</Button>
        <Link onClick={handleShow}>¿Ya tienes un usuario? Inicia Sesion</Link>
      </ButtonGroup>
    </>
  );
};

export default FormRegistro;
