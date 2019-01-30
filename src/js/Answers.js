import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions }) => {
    return (
        <ol>
            {
                allQuestions.map((question, index) => {
                    return <li key={question.question}>{question.question} <br /><strong>{allAnswers[index]}</strong></li>
                })
            }
        </ol>
    );
};

Answers.propTypes = {
    allAnswers: PropTypes.array.isRequired,
    allQuestions: PropTypes.array.isRequired,
};

export default Answers;