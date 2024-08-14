import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from "@chakra-ui/react";

export const SeccionInfo = ({
  array,
  arrayFiltrado,
  title,
  description,
  gap,
}) => {
  const calcularPorcentaje = () => {
    const porcentaje = (arrayFiltrado * 100) / array.length;
    return porcentaje;
  };

  return (
    <>
      <Flex
        gap={gap}
        p="4"
        rounded="xl"
        border="solid 1px darkgray"
        justifyContent="space-around"
        alignItems={"center"}
        w={"100%"}
      >
        <Box>
          <Text fontSize="2xl">{title}</Text>
          <Text display={{ base: "none", md: "block" }}>
            {arrayFiltrado === 0 ? description : arrayFiltrado + description}
          </Text>
        </Box>
        {/* <SunIcon boxSize="4rem"></SunIcon> */}
        <CircularProgress
          value={calcularPorcentaje()}
          size="4rem"
          color="green.400"
        >
          <CircularProgressLabel fontSize={"1rem"}>
            {arrayFiltrado} / {array.length}
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </>
  );
};

export default SeccionInfo;
