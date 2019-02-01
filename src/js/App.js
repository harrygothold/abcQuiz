import React from 'react';
import data from './data/Data';
import Question from './Question';
import Results from './Result';
import Progress from './Progress';
import Arrow from './Arrow';
import defaultImage from '../images/truck.svg';

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
      correctAnswers: null,
      resultsLoaded: false
    }

  }

  onSelectAnswer = (answer) => {
    const { allAnswers, progress } = this.state;
    const currentAnswer = allAnswers[progress];

    if (currentAnswer) {
      //replace it
      allAnswers[progress] = answer;
      this.setState({
        allAnswers
      }, this.goToNextQuestion());
    } else {
      //add answer to array
      this.setState({
        allAnswers: [...allAnswers, answer]
      }, this.goToNextQuestion());
    }


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

  goToPreviousQuestion = () => {
    const { progress, allQuestions, showResults } = this.state;

    this.setState({
      loadNewQuestion: true
    });

    setTimeout(() => {
      if (progress > 0 && !showResults) {
        this.setState({
          progress: progress - 1,
          loadNewQuestion: false,
          currentQuestion: allQuestions[progress - 1]
        })
      }
      showResults && this.setState({
        showResults: false,
        loadNewQuestion: false,
      })
    }, 300);
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

  onRestart = () => {
    this.setState({
      allAnswers: [],
      correctAnswers: null,
      currentQuestion: this.state.allQuestions[0],
      progress: 0,
      resultsLoaded: false,
      showResults: false
    })
  }

  render() {
    const { currentQuestion, loadNewQuestion, showResults, allAnswers, allQuestions, loadingResults, correctAnswers, resultsLoaded, progress } = this.state;

    const { image } = currentQuestion;
    const headerImage = !showResults ? image : defaultImage;

    const navIsActive = allAnswers.length > 0;
    return (
      <div className={`${loadingResults ? 'is-loading-results' : ''} ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}>

        {/* Header - start */}
        <header>
          <img src={headerImage} className={`${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`} />
        </header>
        {/* Header - end */}

        {/* Content - start */}
        <div className={`content`}>

          <Progress total={allQuestions.length} progress={allAnswers.length} />

          {!showResults ? <Question allAnswers={allAnswers} currentQuestion={currentQuestion} onSelectAnswer={this.onSelectAnswer} loadNewQuestion={loadNewQuestion} /> :
            <Results onRestart={this.onRestart} onLoadResult={this.onLoadResult} loadNewQuestion={loadNewQuestion} allAnswers={allAnswers} allQuestions={allQuestions} correctAnswers={correctAnswers} resultsLoaded={resultsLoaded} />}

        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}>
          <Arrow direction='left' progress={progress} allAnswers={allAnswers} goToPreviousQuestion={this.goToPreviousQuestion} showResults={showResults} />
          <Arrow direction='right' progress={progress} allAnswers={allAnswers} goToNextQuestion={this.goToNextQuestion} showResults={showResults} />
        </div>
        {/* Navigation - end */}

      </div>
    )
  }
}

export default App;