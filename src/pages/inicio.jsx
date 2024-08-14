import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/NavBarSesion";
import { useAuth } from "../hooks/useAuth";
import FormSesion from "../components/FromSesion";
import VistaHomeSuperUser from "../components/VistaHomeSuperUser";

const Inicio = () => {
  const { auth } = useAuth();
  return (
    <SidebarWithHeader>
      <Flex direction="column" gap="4">
        {auth.typeUser === "joven" ? <FormSesion /> : <VistaHomeSuperUser />}
      </Flex>
    </SidebarWithHeader>
  );
};

export default Inicio;
