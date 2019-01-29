import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NiceButton extends Component {

    getLetter = (index) => {
        const letters = ['A', 'B', 'C'];
        return letters[index]
    }

    render() {
        const { choice, index, onSelectAnswer } = this.props;
        return (
            <button className="btn btn-huge"><span className="letter" onClick={(e) => { onSelectAnswer(choice) }}>
                {this.getLetter(index)}</span>{choice}</button>
        )
    }
}
NiceButton.propTypes = {
    choices: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    onSelectAnswer: PropTypes.func.isRequired,
}

export default NiceButton;