import { Editable, EditablePreview, EditableInput } from "@chakra-ui/editable"
import { Input } from "@chakra-ui/input"
import React from"react"
import { setConstantValue } from "typescript"
import EditableControls from "./EditableControls"

/*
TODO: 
FIX THE TYPE FOR THE SUBMIT FUNCTION
FIX THE TYPE FOR THE setValue FUNCTION
*/
interface PropTypes {
  value : number,
  submit :()=>any
  setValue:any
  
  
}
const NumberEditField = ({submit,setValue,value}:PropTypes) => {
  console.log(value)
  return(<Editable
    onSubmit={submit}
    onChange={(event)=>setValue(event)}
      textAlign="center"
      defaultValue={value.toString()}
      type="number"
      fontSize="2xl"
      isPreviewFocusable={false}
      value={value.toString()}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable> )
}

export default NumberEditField;