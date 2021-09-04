import { ButtonGroup, IconButton } from '@chakra-ui/button'
import { useEditableControls } from '@chakra-ui/editable'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/layout'
import React from 'react'


const EditableControls= () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label="confirm-button" />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()}  aria-label="close-button"/>
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} aria-label="open-button" />
      </Flex>
    )
  }

export default EditableControls
