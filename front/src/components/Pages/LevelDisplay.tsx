import { useMutation, useReactiveVar } from "@apollo/client";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ALL_LEVELS, REMOVE_LEVEL_QUESTIONS,ADD_LEVEL_QUESTIONS } from "../../queries/Level";
import { levelsState, questionsState, setNotification } from "../../store";
import { idType, Level,Question } from "../../types";
import NumberEditField from "../Basic/NumberEditField";
import { useInputNumber } from "../utils";
import NonAddedQuestionsModal from "./NonAddedQuestionsModal";
import Questions from "./Questions";



interface PropTypes {
  level?: Level | null;
}

const LevelDisplay = (props: PropTypes) => {
  const history = useHistory();
  const [addQuestionsModalState, toggleModalState] = useState<boolean>(false);
  console.log("addQuestionModal",addQuestionsModalState)
  const [nonAddedQuestions, setNonAddedQuestions] = useState < Question[] >([])
  const levelNumber = useInputNumber(0);
  const [level, setLevel] = useState<Level | null | undefined>(null);
  const levels = useReactiveVar(levelsState);
  const { id }: idType = useParams();
  const allQuestions = useReactiveVar(questionsState)
  
  const [addToQuestionsList, AquestionsList_result] = useMutation(ADD_LEVEL_QUESTIONS, {
    onError: (error: any) => {
      if (error && error.graphQLErrors) {
        console.log("error", error)
        setNotification("ERROR", error?.graphQLErrors[0]?.message)
      }
    }
     })
 
  const [removeFromQuestionsList, RquestionsList_result] = useMutation(REMOVE_LEVEL_QUESTIONS, {
    onError: (error: any) => {
      if (error && error.graphQLErrors) {
        console.log("error", error)
        setNotification("ERROR", error?.graphQLErrors[0]?.message)
      }
    }
     })
     
  /*
   * Getting the level from the list
   */
  useEffect(() => {
    if (props.level) setLevel(level);
    else if (id) {
      console.log("levels", levels);

      setLevel(levels.find((l) => l.id === id));
        
        console.log("level",level)
      console.log(allQuestions)
        
      setNonAddedQuestions(allQuestions
        .filter(q => !(level?.questions
              .map(q => q.id)
                   .includes(q.id))))
    } else {
      if (!level) {
        history.push("/");
        setNotification("ERROR", "Error Occured redirected to home screen ");
      }
    }
  }, [levels]);
  
  useEffect(() => {
    if (AquestionsList_result.data) {
      console.log(AquestionsList_result.data);
      
    }
  },[AquestionsList_result.data])
  


  /*
   * Submitting the edited Level
   * @returns the level Updated + Updating the cache
   */
  const numberOnChange = (event:any) => {
    const number = parseInt(event); 
    if (!isNaN(number)) {
      levelNumber.setValue(number);
    }
  }
  const submit = () => {
    console.log(typeof levelNumber.value);


    return null;
  };
  
  const submitQuestionsAdd = () => {
    console.log("submitting")    
    if (level) {
      addToQuestionsList({
        variables: {
          id: level.id,
          questions:allQuestions.filter(q=>!nonAddedQuestions?.map(q=>q.id).includes(q.id)).map(q=>q.id)
        }
      })
    }
    else {
      setNotification('ERROR', "an error has occured");
    }
  }
  const removeQuestionFromLevel = (question:Question) => {
    if (level) {
      removeFromQuestionsList({
        variables:{
        id: level.id,
        questions:level.questions.filter(q=>q.id!==question.id).map(q=>q.id)
       }
      })
      setNonAddedQuestions(nonAddedQuestions.concat(question))
   } 
  }

  if (!level) {
    return (
      <div>
        level is not found might be deleted !
        <Link to="/" className="hover:underline hover:text-blue-300">
          go back !
        </Link>
      </div>
    );
  }

  return (
    <Box>
      <Box>
        <HStack>
          <Text fontSize="3xl">
          </Text>
          <NumberEditField
            setValue={numberOnChange}
            value={levelNumber.value}
            submit={submit}
          />
        </HStack>
        <Heading>
          ID :<span> {level.id}</span>
        </Heading>
      </Box>
      <Box>
        <Text fontSize="5xl" colorScheme="blackAlpha">
          Questions of the level
        </Text>
        <Questions level={level} removeQuestionFromLevel={removeQuestionFromLevel}questions={level.questions} />
        <NonAddedQuestionsModal
          toggleModalStateOpen={() => {
            toggleModalState(true);
          console.log("here")}}
          toggleModalStateClose={() => { toggleModalState(false); submitQuestionsAdd()}}
          modalState={addQuestionsModalState}
          questions={nonAddedQuestions}
          setNonAddedQuestions={setNonAddedQuestions}

        />
      </Box>
    </Box>
  );
};

export default LevelDisplay;

/* <Button
          onClick={toggleNotAddedQuestionView}
          variant="ghost"
          colorScheme="purple"
        >
          Edit Questions
        </Button>*/
