import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Result';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      correctAnswers: null
    }

  }

  onSelectAnswer = (answer) => {
    const { allAnswers } = this.state;
    this.setState({
      allAnswers: [...allAnswers, answer]
    }, this.goToNextQuestion());
  }

  goToNextQuestion = () => {
    console.log('Go to next question');
    const { progress, allQuestions, loadNewQuestion } = this.state;
    this.setState({
      loadNewQuestion: true
    });
    setTimeout(() => {

      if (progress < allQuestions.length - 1) {
        this.setState({
          progress: progress + 1,
          currentQuestion: allQuestions[progress + 1],
          loadNewQuestion: false
        })
      } else {
        this.setState({
          loadNewQuestion: false,
          showResults: true
        })
      }
    }, 300)
  }

  onLoadResult = () => {
    console.log('Loading results');
    this.setState({
      loadingResults: true
    })
    fetch('https://api.myjson.com/bins/zgpjb').then(response => response.json())
      .then(parsedJSON => {
        console.log(parsedJSON.correctAnswers);
        const correctAnswers = parsedJSON.correctAnswers;
        this.setState({ correctAnswers, loadingResults: false, resultsLoaded: true })
      })
      .catch(error => {
        console.log(error);
        this.setState({ loadingResults: false, resultsLoaded: true })
      })
  }

  render() {
    const { currentQuestion, loadNewQuestion, showResults, allAnswers, allQuestions, loadingResults, correctAnswers, resultsLoaded } = this.state;
    return (
      <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>

        {/* Header - start */}
        <header>
          <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/images/plane.svg" className={`${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`} />
        </header>
        {/* Header - end */}

        {/* Content - start */}
        <div className={`content`}>

          {/* Progress - start */}
          <div className="progress-container">
            <div className="progress-label">1 of 5 answered</div>
            <div className="progress">
              <div className="progress-bar" style={{ 'width': `20%` }}>
                <span className="sr-only">20% Complete</span>
              </div>
            </div>
          </div>
          {/* Progress - end */}

          {!showResults ? <Question currentQuestion={currentQuestion} onSelectAnswer={this.onSelectAnswer} loadNewQuestion={loadNewQuestion} /> : <Results onLoadResult={this.onLoadResult} loadNewQuestion={loadNewQuestion} allAnswers={allAnswers} allQuestions={allQuestions} correctAnswers={correctAnswers} />}

        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center is-active`}>
          <button className={`arrow`}>
            <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-left-arrow.svg" />
          </button>
          <button disabled className={`arrow is-disabled`}>
            <img src="https://ihatetomatoes.net/react-tutorials/abc-quiz/fonts/navigation-right-arrow.svg" />
          </button>
        </div>
        {/* Navigation - end */}

      </div>
    )
  }
}

export default App;