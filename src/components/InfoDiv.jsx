import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import planta from "../images/Planta_icono@4x.png";
import saludo from "../images/saludo_icono@4x.png";
import donbosco from "../images/donbosco_icono@4x.png";

export const InfoDiv = () => {
  return (
    <>
      <Flex
        p="8"
        px={{ lg: "40" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap="8"
      >
        <Flex
          boxShadow="lg"
          p="6"
          rounded="md"
          alignItems="center"
          justifyContent="center"
          bg={useColorModeValue("gray.300", "gray.600")}
        >
          <Flex direction="column" p="4" gap="4">
            <Heading>
              ¿Sabías que somos el primer Grupo Scout Don Bosco de Venezuela?
            </Heading>
            <Text>
              Vamos rumbo a 60 años comprometidos con educar, formar y recrear a
              jóvenes a través de nuestras actividades. Formando ciudadanos
              ejemplares para el futuro.
            </Text>
          </Flex>
          <Box
            boxSize="100%"
            p="8"
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Image maxW="10rem" src={planta}></Image>
          </Box>
        </Flex>
        <Flex
          boxShadow="lg"
          p="6"
          rounded="md"
          alignItems="center"
          justifyContent="center"
          bg={useColorModeValue("gray.300", "gray.600")}
        >
          <Box
            boxSize="100%"
            p="8"
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Image maxW="10rem" src={saludo}></Image>
          </Box>
          <Flex direction="column" p="4" gap="4">
            <Heading>¿Qué son los Scouts?</Heading>
            <Text>
              El Escultismo, es un movimiento infantil y juvenil que busca
              educar a niños y jóvenes, con base en valores y juegos al aire
              libre como método de enseñanza no formal, que actualmente está
              presente en 165 países y territorios, con aproximadamente 55
              millones de miembros en todo el mundo, agrupados en distintas
              organizaciones.
            </Text>
          </Flex>
        </Flex>
        <Flex
          boxShadow="lg"
          p="6"
          rounded="md"
          alignItems="center"
          justifyContent="center"
          bg={useColorModeValue("gray.300", "gray.600")}
        >
          <Flex direction="column" p="4" gap="4">
            <Heading>
              ¿Cómo puedo formar parte del Grupo Scout Don Bosco?
            </Heading>
            <Text>
              ¡Es simple! Contáctanos a través de los medios disponibles. Luego,
              visita nuestro local de actividades el día que corresponda.
              Participar es completamente gratis (Hasta el momento en que
              decidas ser un miembro oficial registrado).
            </Text>
          </Flex>
          <Box
            boxSize="100%"
            p="8"
            display={{ base: "none", md: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Image maxW="10rem" src={donbosco}></Image>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default InfoDiv;
