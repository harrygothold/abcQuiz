import React from 'react';
import PropTypes from 'prop-types'
import Answers from './Answers';

const Results = ({ loadNewQuestion, allAnswers, allQuestions, onLoadResult, correctAnswers, resultsLoaded, onRestart }) => {

    let numberOfCorrect = 0;
    correctAnswers && allQuestions.map((question, index) => {
        correctAnswers[index] === allAnswers[index] && numberOfCorrect++;
    })

    return (
        <div className={`results fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`} >
            <div className="loader"><div className="icon"></div></div>
            <div className="results-overlay"></div>
            <h1>{`${resultsLoaded ? `${numberOfCorrect} out of ${allQuestions.length} correct!` : 'Here are your answers:'}`}</h1>
            <div className="answers">
                <Answers allAnswers={allAnswers} allQuestions={allQuestions} correctAnswers={correctAnswers} />
            </div>
            <div className="text-center">
                {resultsLoaded ?
                    <button className="btn btn-dark" onClick={(e) => {
                        onRestart();
                    }}>Start Again</button> :
                    <button className="btn btn-dark" onClick={(e) => {
                        onLoadResult()
                    }}>Submit</button>
                }
            </div>
        </div>
    )
}

Results.propTypes = {
    loadNewQuestion: PropTypes.bool.isRequired,
    allAnswers: PropTypes.array.isRequired,
    allQuestions: PropTypes.array.isRequired,
    onLoadResult: PropTypes.func.isRequired,
    correctAnswers: PropTypes.array,
    resultsLoaded: PropTypes.bool.isRequired,
    onRestart: PropTypes.func.isRequired,
}

export default Results;