PracticeSection = React.createClass({
  getPropTypes: function() {
    return ({
      question: React.propTypes.String,
      callbacks: React.propTypes.Object,
      correct: React.propTypes.Bool,
      missed: React.propTypes.string
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.correct && !nextProps.missed) {
      this.setState({userAnswer: ""});
    }
  },

  getInitialState: function() {
    return {userAnswer: ""};
  },

  handleCharacterKey: function(e) {
    if (e.key != "Enter") this.setState({userAnswer: this.state.userAnswer + e.key.toUpperCase()});
  },

  handleKeyDown: function(e) {
    if (e.key == "Enter") {
      if (this.props.missed) {
        this.props.callbacks.nextQuestion();
      } else {
        this.props.callbacks.answer(this.state.userAnswer);
      }
    } else if (e.key == "Backspace") {
      var answer = this.state.userAnswer;
      if (answer.length > 0) answer = answer.substring(0, answer.length - 1);
      this.setState({userAnswer: answer});
    }
  },

  render: function() {
    var correction = "", feedback = "", feedbackClass = "answer-feedback";
    if (this.props.correct) {
      feedback = "✔";
      feedbackClass += " correct";
    } else if (this.props.missed) {
      feedback = "✖";
      feedbackClass += " wrong";
      correction = "- " + this.props.missed.toUpperCase();
    }
    return (
      <div className="practice-section">
        <div className="practice-prompt">{this.props.question}</div>
        <textarea className="practice-answer" onKeyPress={this.handleCharacterKey}
                  onKeyDown={this.handleKeyDown} value={this.state.userAnswer}/>
        <div className="answer-correction">{correction}</div>
        <div className={feedbackClass}>{feedback}</div>
      </div>
    );
  }
});
