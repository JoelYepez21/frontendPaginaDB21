import { Flex } from "@chakra-ui/react";
import SidebarWithHeader from "../components/navbars/NavBarSesion";
import { useAuth } from "../hooks/useAuth";
import VistaFichaMedicaSuperUser from "../components/componentesSuperUser/VistaFichaMedicaSuperUser";
import VistaFichaMedicaUser from "../components/componentesUser/FichaMedicaUser";

const FichaMedica = () => {
  const { auth } = useAuth();
  return (
    <SidebarWithHeader>
      <Flex direction="column" gap="4">
        {auth.typeUser === "joven" ? (
          <VistaFichaMedicaUser />
        ) : (
          <VistaFichaMedicaSuperUser />
        )}
      </Flex>
    </SidebarWithHeader>
  );
};

export default FichaMedica;
