import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export const FromPagoEfectivo = () => {
  return (
    <>
      <Flex direction="column" gap="4">
        <FormControl>
          <FormLabel>Dirigente a quien se lo entrego:</FormLabel>
          <Input placeholder="" />
        </FormControl>
        <FormControl>
          <FormLabel>Monto en divisas:</FormLabel>
          <Input placeholder="" />
        </FormControl>
        <ButtonGroup display="flex" alignItems="center" justifyContent="center">
          <Button colorScheme="blue" mr={3}>
            Pagar
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default FromPagoEfectivo;
