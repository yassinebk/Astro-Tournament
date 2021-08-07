import React, {ReactElement} from 'react'
import {Question} from '../../types';
import {Button} from "@chakra-ui/react"


interface PropTypes {
    questions: Question[]
    toggleModalOpen?: any
}

const Questions = (props: PropTypes): ReactElement<any, any> => {
    const questions = props.questions;
    return (
        <div className="table w-auto m-auto p-2">
            <table className="w-full border">
                <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="border-r p-2">
                        <input type="checkbox"/>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            ID
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Question
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Action
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                            </svg>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-gray-50 text-center">
                    <td className="p-2 border-r"></td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2 border-r"></td>
                </tr>
                {questions.map((question: Question) => {
                    return (
                        <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                            <td className="p-2 border-r">
                                <input type="checkbox"/>
                            </td>
                            <td className="p-4 border-r">{question.id}</td>
                            <td className="p-4 border-r">{question.question}</td>
                            <td className="p-4 w-48">
                                <Button
                                    href="#"
                                    class="w-1/2 bg-blue-900 p-2 text-white hover:shadow-lg text-base font-bold rounded-md transform hover:scale-150"
                                >
                                    Edit
                                </Button>
                                <Button href="#"
                                        class="w-1/2 bg-red-900 p-2 text-white hover:shadow-lg text-base font-bold rounded-sm transform focus:scale-50 transition-transform duration-300">
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {props.toggleModalOpen && <button onClick={props.toggleModalOpen}
                                              className="bg-green-500 text-white p-4 w-48 rounded-lg h-11 flex flex-row text text-xl justify-center items-center hover:opacity-60 transform hover:scale-90">
                Add Question
            </button>}
        </div>
    );
}


export default Questions