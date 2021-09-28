import { useEditableControls } from "@chakra-ui/editable";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";
interface EditableControlsProps {
  onClick?: (value: any) => void;
}
const EditableControls: React.FC<EditableControlsProps> = ({ onClick }) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="confirm edit"
        size="lg"
        bgColor="transparent"
        icon={<CheckIcon fontSize="20px" />}
        {...getSubmitButtonProps({ onClick })}
      />
      <IconButton
        aria-label="close edit"
        bgColor="transparent"
        size="lg"
        icon={<CloseIcon fontSize="20px" />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center" marginLeft="auto">
      <IconButton
        bgColor="transparent"
        aria-label="edit"
        size="lg"
        icon={<EditIcon fontSize="30px" />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

export default EditableControls;
