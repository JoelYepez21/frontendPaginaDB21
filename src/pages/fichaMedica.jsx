import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/NavBarSesion";
import { useAuth } from "../hooks/useAuth";
import VistaFichaMedicaSuperUser from "../components/VistaFichaMedicaSuperUser";
import VistaFichaMedicaUser from "../components/FichaMedicaUser";

const FichaMedica = () => {
  const { auth } = useAuth();
  return (
    <SidebarWithHeader>
      <Flex direction="column" gap="4">
        {auth.typeUser === "joven" ? <VistaFichaMedicaUser /> : <VistaFichaMedicaSuperUser />}
      </Flex>
    </SidebarWithHeader>
  );
};

export default FichaMedica;
