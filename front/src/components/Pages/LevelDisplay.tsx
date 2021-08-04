import React from 'react'
import { Level } from '../types'
import Questions from './Questions'
interface PropTypes {
    level:Level|null
}
const LevelDisplay = (props:PropTypes) => {
    console.log("here",props.level)
    if(!props.level){
        return (
            <div>
                <h1> Error Go back  to Home</h1>

            </div>
        )
    }
    return (
        <div>
            <div>
                <h1>Level Number <span>{props.level.number}</span></h1>
                <h3>ID <span>{props.level.id}</span></h3>
            </div>
            <div>
                    <Questions questions={props.level.questions}/>

            </div>
        </div>
    )
}

export default LevelDisplay
