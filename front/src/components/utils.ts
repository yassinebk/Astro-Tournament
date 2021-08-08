import { useState } from "react";
import { setNotification } from "../store";

export const useInput = (type: string) => {
  const [value, setValue] = useState("");
  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  const clear = () => setValue("");

  return {
    setValue,
    type,
    value,
    clear,
    onChange,
  };
};


export const useInputNumber = (defaultValue:number) => {
  const [value, setValue] = useState(defaultValue);
  const onChange = (event: any) => {
    setValue(event.target.value);
  };
  const clear = () => setValue(defaultValue);
  const type = "number" ;

  return {
    setValue,
    value,
    type,
    clear,
    onChange,
  };
};



export const graphqlErrorNotification = (error: any) => {
  if (error && error.graphQLErrors) {
    console.log("error", error.graphQLErrors[0]);
    setNotification("ERROR", error.graphQLErrors[0].message as string);
  }
};
