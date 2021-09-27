import { useToast } from "@chakra-ui/toast";
import { IconType } from "@react-icons/all-files/lib";
import React from "react";

interface ErrorPopupProps {
  popupType: "info" | "warning" | "success" | "error";
  popupMessage: string;
  popupTitle: string;
}

export const Toast = ({
  popupMessage,
  popupType,
  popupTitle,
}: ErrorPopupProps): void => {
  const toast = useToast();
  toast({
    title: popupTitle,
    description: popupMessage,
    status: popupType,
    duration: 3000,
    isClosable: true,
  });
};

export default Toast;
