import { useContext } from 'react'
import { GameStateContext } from '../helpers/Contexts'



export default function Intro() {
    const { setGameState } = useContext(GameStateContext)


    return (
        <div className="intro--container">
            <h1>Quizzical</h1>
            <p>Put your trivia skills to the test!</p>
            <button 
                className="start--btn"
                onClick={() => {
                    setGameState("playing")
                }}
                >
                Start Quiz
                </button>
        </div>
    )


}