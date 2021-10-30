import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const ConfirmDialog = ({ text, onClose, isOpen, callback }) => {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay
        bgColor="rgba(0,0,0,0.2)"
        //   position="absolute"
        //   top="50%"
        //   left="50%"
        //   transform="translate(-50%, -50%)"
        //   w="fit-content"
        // >
      >
        <AlertDialogContent
          bgColor="black"
          color="white"
          shadow="dark-lg"
          marginX={4}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {text}
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Flex dir="row" w="full" justifyContent="space-around">
              <Button
                ref={cancelRef}
                onClick={onClose}
                color="blackAlpha.900"
                bgColor="gray.300"
                minW="100px"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                minW="100px"
                onClick={() => {
                  callback();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
