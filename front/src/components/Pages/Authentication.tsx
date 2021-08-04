import React from 'react'
import {useHistory} from"react-router-dom"
import { User } from '../../types'

interface PropTypes{
    children:JSX.Element
    user:User
}
const Authentication= (props:PropTypes) => {
    const history =useHistory()
    if (!props.user) {
        history.push("/")
        return null
    }
    return (
        <>
           {props.children} 
        </>
    )
}

export default Authentication
