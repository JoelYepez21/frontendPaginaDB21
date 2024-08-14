import { Flex, useColorModeValue } from "@chakra-ui/react";
import SidebarWithHeader from "../components/NavBarSesion";
import FormSesion from "../components/FromSesion";
import VistaUsuarios from "../components/VistaUsuarios";
import { useAuth } from "../hooks/useAuth";

export const Sesion = () => {
  const { auth } = useAuth();
  return (
    <SidebarWithHeader>
      <Flex
        bg={useColorModeValue("#fbf090", "gray.900")}
        justifyContent="center"
        gap={{ base: "none", md: "4" }}
      >
        {auth.typeUser === "joven" ? <FormSesion /> : <VistaUsuarios />}
      </Flex>
    </SidebarWithHeader>
  );
};
export default Sesion;
