import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NiceButton extends Component {

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
            <button ref={(input) => this.button = input} className="btn btn-huge" onClick={(e) => { this.handleClick(e) }}><span className="letter">
                {this.getLetter(index)}</span>{choice}</button>
        )
    }
}
NiceButton.propTypes = {
    choice: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
}

export default NiceButton;