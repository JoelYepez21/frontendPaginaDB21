import {
  Button,
  ButtonGroup,
  FormControl,
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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const FormLogin = ({ handleShow }) => {
  const refInput = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();

  useEffect(() => {
    refInput.current.focus();
  }, []);

  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };
  const handleLoginUser = async () => {
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      setAuth(data);
      navigate("/inicio");
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
        Inicia sesion como miembro <br />
        Scout Oficial.
      </Heading>
      <FormControl>
        <FormLabel>Correo Electronico</FormLabel>
        <Input
          ref={refInput}
          bg="white"
          type="text"
          color="black"
          value={email}
          required
          onChange={handleEmail}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup>
          <Input
            bg="white"
            type={showPassword ? "text" : "password"}
            color="black"
            value={password}
            required
            onChange={handlePassword}
          />{" "}
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
      </FormControl>
      <ButtonGroup
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="4"
        textAlign="center"
      >
        <Button onClick={handleLoginUser}>Iniciar Sesion</Button>
        <Link onClick={handleShow}>
          ¿Aun no tienes un usuario? <br />
          Registrate aqui
        </Link>
      </ButtonGroup>
    </>
  );
};

export default FormLogin;
