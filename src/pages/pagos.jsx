import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/navbars/NavBarSesion";
import VistaPagos from "../components/componentesUser/VistaPagos";
import VistaPagosSuperUser from "../components/componentesSuperUser/VistaPagosSuperUser";
import { useAuth } from "../hooks/useAuth";

const FormularioPagos = () => {
  const { auth } = useAuth();

  return (
    <SidebarWithHeader>
      <Flex direction="column" gap="4">
        {auth.typeUser === "joven" ? <VistaPagos /> : <VistaPagosSuperUser />}
      </Flex>
    </SidebarWithHeader>
  );
};

export default FormularioPagos;
