import { useState, useEffect, useContext } from 'react'
import Question from './Question'
import he from 'he'
import { nanoid } from 'nanoid'
import { ThreeDots } from 'react-loader-spinner'
import { GameStateContext } from '../helpers/Contexts'
import Confetti from 'react-confetti'


export default function Quiz(props) {

  const [isLoading, setIsLoading] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const { setGameState, score, setScore } = useContext(GameStateContext)

 



//fetch the api data and set quiz data 
function quizApi() {
    fetch("https://opentdb.com/api.php?amount=5")  
      .then(res => res.json())
      .then(data => {
        // console.log(data.results)
        setQuizData(data.results.map(quiz => {
          const id = nanoid()
          const sortedAnswers = [...quiz.incorrect_answers, quiz.correct_answer ].sort()
          const correctAnswer = quiz.correct_answer
  
          const answerObject = sortedAnswers.map((answer, index) => {
            return {
              option: he.decode(answer),
              answerId: id + index,
              isCorrect: answer === correctAnswer ? true : false,
              isSelected: false,
              score: 0
            }
          })
  
          return {
            question: he.decode(quiz.question),
            answers: answerObject,
            id: id
          }
        }))
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
      })
    }

    //only render quizApi once per page load
    useEffect(() => {
        quizApi()
      }, [])
    
    //check if answers are selected 
    const handleAnswerSelected = (questionId, id) => {
        setQuizData(prevQuizData => {
          return prevQuizData.map(qEl => {
            if(qEl.id === questionId) {
              return {
                ...qEl,
                answers: qEl.answers.map(ansEl => {
                  if(ansEl.answerId === id) {
                    return {
                      ...ansEl,
                      isSelected: !ansEl.isSelected,
                    }
                  } else {
                      return {
                        ...ansEl,
                        isSelected: false
                    }
                  }
                })
                }
              }
              else {
                return {...qEl}
              }
            })
          })
      }
    

      //check if selected answers are corrrect
    const handleCheckAnswers = (e) => {
      setCheckAnswers(prevCheckAnswers => !prevCheckAnswers)
      quizData.map(question => {
        return question.answers.map(answer => {
          setEndGame(true)
          return (
            answer.isCorrect && answer.isSelected ? 
            setScore(prevScore => prevScore + 1) :
            score
          )
        })
      })
    }

    //reset back to the intro page
    const restartQuiz = () => {
      setScore(0)
      setEndGame(false)
      setCheckAnswers(false)
      setGameState("intro")
    }
 

    //map over data to create Question component
    const quizElements = quizData.map(quiz => {

        return <Question 
                  key={quiz.id}
                  question={quiz.question}
                  answers={quiz.answers}
                  id={quiz.id}
                  checked={checkAnswers}
                  handleSelection={handleAnswerSelected}
                  />
      })
     


    return (
        <div className="quiz--container">
    
            {isLoading 
                && <ThreeDots 
                        height="200" 
                        width="200" 
                        radius="20"
                        color="#FFFFFF" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName="loading--dots"
                        visible={true}
                        />
            }
        
            {!isLoading && <div className="quiz">
                <h1>Quizzical</h1>
                    <div className="quiz--elements">
                        {quizElements}
                    </div>

                <div className="btn--elements"> 
                    {!endGame && <button 
                        className="check--answers--btn"
                        onClick={handleCheckAnswers}>
                        Check Answers
                    </button>}

                    {endGame && <div className="results--container">
                      <Confetti />
                          {score === 5 ? 
                            <p className="results">You got them all right!        Celebrate! 🏆</p> 
                            : 
                            <p className="results">🎉 Great job! 🎉</p> }
                            <p className="score">You scored {score} out of 5</p>

                      <button 
                          className="play--again--btn"
                          onClick={() => restartQuiz()}>
                          Play Again
                      </button>
                    </div>}
                </div>   
            </div>}
        </div>
      )
      
    }


    