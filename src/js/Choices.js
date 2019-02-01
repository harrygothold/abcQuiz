import React from 'react'
import PropTypes from 'prop-types'
import NiceButton from './NiceButton';


const Choices = ({ choices, onSelectAnswer, allAnswers }) => {
    return (
        <div className="choices">
            {
                choices.map((choice, index) => {
                    return <NiceButton key={choice} choice={choice} index={index} onSelectAnswer={onSelectAnswer} allAnswers={allAnswers} />
                })
            }
        </div>
    )
}

Choices.propTypes = {
    choices: PropTypes.array.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    allAnswers: PropTypes.array.isRequired,
}

export default Choices
