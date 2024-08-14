"use client";

import {
  Box,
  chakra,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import scouts from "../images/SCOUTS_LOGO.png";
// import { ReactNode } from "react";

const Logo = () => {
  return <Image maxW="10rem" src={scouts}></Image>;
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={"white"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("gray.300"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box w={"100%"} bg={" #64249c "}>
      <Flex
        py={4}
        flexDirection={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        spacing={4}
      >
        <Logo />
        <Text color={"white"}>© 2024. Todos los derechos reservados</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Twitter"}
            href={"https://www.tiktok.com/@donboscoavila?_t=8orDOWaB8Z3&_r=1"}
          >
            <FaTiktok color=" #64249c " />
          </SocialButton>
          <SocialButton
            label={"Facebook"}
            href={
              "https://www.facebook.com/share/BYaWtuGyYetmDwwW/?mibextid=qi2Omg"
            }
          >
            <FaFacebook color=" #64249c " />
          </SocialButton>
          <SocialButton
            label={"Instagram"}
            href={
              "https://www.instagram.com/donboscoavila?igsh=cHhocGgwbjFkbGZo"
            }
          >
            <FaInstagram color=" #64249c " />
          </SocialButton>
        </Stack>
      </Flex>
    </Box>
  );
}
