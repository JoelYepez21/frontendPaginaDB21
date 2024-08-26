import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/navbars/NavBarSesion";
import { useAuth } from "../hooks/useAuth";
import FormSesion from "../components//FromSesion";
import VistaHomeSuperUser from "../components/componentesSuperUser/VistaHomeSuperUser";

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
