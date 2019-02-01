import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NiceButton extends Component {

    get selected() {
        const { allAnswers, choice } = this.props;

        //Will return true if answer is in array
        return allAnswers.includes(choice);
    }

    getLetter = (index) => {
        const letters = ['A', 'B', 'C'];
        return letters[index]
    }
    handleClick = (e) => {
        const { choice, onSelectAnswer } = this.props;
        this.button.classList.add('is-selected', 'is-highlighted');
        setTimeout((e) => {
            onSelectAnswer(choice);
        }, 500)
    }
    render() {
        const { choice, index, onSelectAnswer } = this.props;
        return (
            <button ref={(input) => this.button = input} className={`btn btn-huge ${this.selected ? 'is-selected' : ''}`} onClick={(e) => { this.handleClick(e) }}><span className="letter">
                {this.getLetter(index)}</span>{choice}</button>
        )
    }
}
NiceButton.propTypes = {
    choice: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
    allAnswers: PropTypes.array.isRequired,
}

export default NiceButton;