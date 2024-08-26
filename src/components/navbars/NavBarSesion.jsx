"use client";
import logo from "../../images/logo.png";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
} from "@chakra-ui/react";

import {
  FiMenu,
  FiChevronDown,
  FiUsers,
  FiDollarSign,
  FiPlusCircle,
  FiUser,
  FiTrello,
} from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/useAuth";
import { Link, Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SidebarContent = ({ onClose, ...rest }) => {
  const { auth } = useAuth();
  // const navigate = useNavigate();
  const LinkItemsSuperUser = [
    { name: "Inicio", icon: FiTrello, to: "/inicio" },
    { name: "Ver Usuarios", icon: FiUsers, to: "/sesion" },
    { name: "Ver fichas Medicas", icon: FiPlusCircle, to: "/medica" },
    { name: "Ver Pagos", icon: FiDollarSign, to: "/pagos" },
  ];
  const LinkItemsUser = [
    { name: "Mis datos", icon: FiUser, to: "/sesion" },
    { name: "Mi ficha medica", icon: FiPlusCircle, to: "/medica" },
    { name: "Pago de Registro", icon: FiDollarSign, to: "/pagos" },
  ];
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("#fbf090", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("black", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          DBA 21
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {auth.typeUser === "joven"
        ? LinkItemsUser.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              to={link.to}
              name={link.name}
            />
          ))
        : LinkItemsSuperUser.map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              to={link.to}
              name={link.name}
            />
          ))}
    </Box>
  );
};

const NavItem = ({ icon, name, to, ...rest }) => {
  return (
    <Link
      as={ReactRouterLink}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "black",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // cerrar
  const handleLogout = async () => {
    try {
      const response = await axios.get("api/logout");
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("#fbf090", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("black", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Don Bosco
      </Text>

      <HStack spacing={{ base: "2", md: "6" }}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={logo} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{auth.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {auth.typeUser}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg={useColorModeValue("#fbf090", "gray.900")}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
