import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from "@chakra-ui/button";
export const Button = ({ label, icon }) => {
  return (
    <ChakraButton
      aria-label={label}
      icon={icon}
      bgColor="#7FD8D8"
      borderRadius="5.5px"
    />
  );
};

export const IconButton = ({ icon, styles }) => {
  return <ChakraIconButton icon={icon} {...styles} />;
};
