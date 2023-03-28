import { useState } from 'react'
import { GameStateContext } from './helpers/Contexts'
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import './App.css';


function App() {

  const [gameState, setGameState] = useState("intro")
  const [score, setScore] = useState(0)

  
  //using context as an alternative to passing props 
  return (
    <div className="app">
      <GameStateContext.Provider 
          value={{
            gameState,
            setGameState,
            score,
            setScore,
          }}
          >
            {gameState === "intro" && <Intro />}
            {gameState === "playing" && <Quiz />}
        </GameStateContext.Provider>
    </div>
  )

}

export default App;
