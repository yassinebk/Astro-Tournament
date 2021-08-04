import {useState} from "react"



export const useInput = (type:string)=>{

    const [value,setValue]= useState('');
    const onChange =(event:any)=>{
         setValue(event.target.value)};
    const clear = ()=>setValue('');

    return {
        setValue,
        type,
        value,
        clear,
        onChange,
}}
