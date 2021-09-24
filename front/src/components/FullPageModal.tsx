import { Button, IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { Form } from "formik";
import React from "react";

interface FullPageModalProps {
  onClose: () => void;
  blurred?: boolean;
  modalTitle?: string;
  isOpen: boolean;
  ownBackButton: boolean;
}

export const FullPageModal: React.FC<FullPageModalProps> = ({
  onClose,
  isOpen,
  modalTitle,
  blurred = false,
  children,
  ownBackButton = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent
        color="white"
        backdropFilter={blurred && "blur(20px)"}
        bg={
          blurred
            ? "rgba(0, 0, 0, 0.64)"
            : " linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 1) 100%, rgba(245, 245, 245, 0.8) 100%)"
        }
      >
        {modalTitle && (
          <ModalHeader color="#7FD8D8" paddingX="10%">
            {modalTitle}
          </ModalHeader>
        )}
        <ModalBody marginTop="15%" maxH="800px" backdropBlur="lg">
          <Flex flexDir="row" justifyContent="flex-start" w="100%">
            {!ownBackButton && (
              <IconButton
                bgColor="transparent"
                icon={<ChevronLeftIcon />}
                aria-label="go back"
                onClick={onClose}
                color="white"
                size="lg"
                fontSize="45px"
              />
            )}
          </Flex>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullPageModal;
