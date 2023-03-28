




export default function Question(props) {

    const answer = props.answers.map((answer, index) => {

        const styles = {
            backgroundColor: props.checked && answer.isCorrect ? "#AAE8C2" :
            props.checked && answer.isSelected && !answer.isCorrect ?
            "#FF6347	" :
            answer.isSelected ? "#92A3FF" : "white"
        }

        return <button 
                key={index}
                className="answers--btn"
                onClick={ () => props.handleSelection(props.id, answer.answerId)}
                style={styles}
                >
                {answer.option}
                </button>

    })

    return (

        <div>
            <div className="question--container">
                <h2 className="question">{props.question}</h2>
                <div className="answer--btn--wrapper">
                    { answer }
                </div>
            </div>
        </div>
    )



}