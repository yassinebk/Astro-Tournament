import React, { ReactElement,useState ,useEffect} from "react";
import { Question, Level, idType, newQuestion } from "../../types";
import { IconButton, Button } from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import QuestionFormModal from "./QuestionFormModal"
import {ADD_QUESTION} from"../../queries/Questions"
import {useMutation} from"@apollo/client"
import { setNotification } from "../../store";

interface PropTypes {
  questions: Question[];
  toggleModalOpen?: any;
  level?: Level | null;
  removeQuestionFromLevel?:any
}

const Questions = ({ questions, level, removeQuestionFromLevel, }: PropTypes): ReactElement<any, any> => {
  const [addQuestion, addQuestion_result] = useMutation(ADD_QUESTION, {
    onError: (error: any) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  const [message,setMessage]=useState("")
  const [modalState, toggleModalState] = useState<boolean>(false);
  const toggleModalOpen = () => {
    toggleModalState(true)
  }
  const toggleModalClose = () => {
    toggleModalState(false)
  }
  const editQuestion = () => {};

  const removeQuestion = () => {};

  interface buttonProps{
    question:Question
}

  useEffect(() => {
    setNotification("ERROR",message) 

  }, [message])
  const QuestionLevelButton = ({question}:buttonProps ) => {
    return (
      <IconButton
        backgroundColor="red.300"
        aria-label="remove-question"
        icon={<MinusIcon />}
        onClick={()=>removeQuestionFromLevel(question)}
      >
      </IconButton>
    );
       }
       
  const submitAddQuestion = (question:newQuestion) => {

    addQuestion({ variables: question });
 } 

  return (
    <div className="table w-auto m-auto p-2">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="border-r p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                ID
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Question
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Action
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50 text-center">
            <td className="p-2 border-r"></td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r">
              <input type="text" className="border p-1" />
            </td>
            <td className="p-2 border-r"></td>
          </tr>
          {questions.map((question: Question) => {
            console.log("question",question)
            return (
              <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                <td className="p-2 border-r">
                  <input type="checkbox" />
                </td>
                <td className="p-4 border-r">{question.id}</td>
                <td className="p-4 border-r">{question.question}</td>
                <td className="p-4 w-48">
                  {level ? (
                    <QuestionLevelButton question={question} />
                  ) : (
                    <>
                      <Button
                        onClick={editQuestion}
                        class="w-1/2 bg-blue-900 p-2 text-white hover:shadow-lg text-base font-bold rounded-md transform hover:scale-150"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={()=>removeQuestion}
                        class="w-1/2 bg-red-900 p-2 text-white hover:shadow-lg text-base font-bold rounded-sm transform focus:scale-50 transition-transform duration-300"
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      <QuestionFormModal onSubmit={submitAddQuestion} onClose={toggleModalClose} modalOpen={modalState} toggleModalOpen={toggleModalOpen}  error={message}/>
    </div>
  );
};

export default Questions;
