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
  modalTitle: string;
  isOpen: boolean;
}

export const FullPageModal: React.FC<FullPageModalProps> = ({
  onClose,
  isOpen,
  modalTitle,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay minW="770px" backdropBlur={20} bgColor="rgba(0,0,0,0.9)" />
      <ModalContent bgColor="transparent" color="white">
        {modalTitle && (
          <ModalHeader color="#7FD8D8" paddingX="10%">
            {modalTitle}
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody
          maxH="800px"
          backdropBlur="lg"
          bg=" linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 1) 100%, rgba(245, 245, 245, 0.8) 100%)"
        >
          <Flex flexDir="row" justifyContent="flex-start" w="100%">
            <IconButton
              bgColor="transparent"
              icon={<ChevronLeftIcon />}
              aria-label="go back"
              onClick={onClose}
              color="white"
              size="lg"
              fontSize="45px"
            />
          </Flex>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullPageModal;
