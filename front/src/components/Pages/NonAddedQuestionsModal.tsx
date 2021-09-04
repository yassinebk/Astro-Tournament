import React, { SetStateAction } from "react";
import { Box,IconButton,Text,HStack, Button, Modal, ModalBody, ModalFooter, ModalHeader, VStack ,ModalContent,ModalOverlay} from '@chakra-ui/react'
import { AddIcon } from "@chakra-ui/icons";
import { Question } from "../../types";


interface PropTypes {
  toggleModalStateOpen: () => void,
  toggleModalStateClose:()=>void
  modalState:boolean
 questions:Question[]
 setNonAddedQuestions:(value:React.SetStateAction<Question[]>) =>void
}
const NonAddedQuestionsModal = ({toggleModalStateClose,toggleModalStateOpen,modalState,questions,setNonAddedQuestions}:PropTypes) => {

  const addQuestion = (id:string) => {
    const updatedQuestionList =questions?.filter(q => q.id !== id)
    console.log("non added Questions")
    if(updatedQuestionList)
    setNonAddedQuestions(updatedQuestionList);
  }
  console.log("questions",questions)

  return (
    <>
      <Button onClick={toggleModalStateOpen} variant="solid" colorScheme="purple" >
      Add Questions
    </Button>
  <Modal
    size="4xl"
    isCentered
    onClose={toggleModalStateClose}
    isOpen={modalState}
    scrollBehavior="inside"
    >
    <ModalOverlay/>
    <ModalContent>
    <ModalHeader>
      Add a question
    </ModalHeader>
 
    <ModalBody>
 <VStack
    border="2px"
    borderColor="ThreeDShadow"
    shadow="md"
  >

    {
      questions?.map((q) => {return(
        <HStack spacing="20" border="1px" shadow="md" borderColor="gray" padding="10">
                 <Text fontWeight="semibold" fontSize="large">
            {q.id}
            </Text>
          <Text fontSize="large">
            {q.question}
          </Text>
          <IconButton onClick={()=>addQuestion(q.id)} icon={<AddIcon/>} colorScheme="green" variant="solid" aria-label="adding-question"  />
        </HStack>)
      })
  }
    
  </VStack>
    </ModalBody>
  <ModalFooter>
        <Button onClick={toggleModalStateClose}>
          Close
        </Button>
  </ModalFooter>
  </ModalContent>

      

    
    </Modal>
    
    </>)
 };

export default NonAddedQuestionsModal;
