PracticeSection = React.createClass({
  getPropTypes: function() {
    return ({
      question: React.propTypes.String,
      callbacks: React.propTypes.Object
    });
  },

  getInitialState: function() {
    return {userAnswer: ""};
  },

  handleAnswerChange: function (event) {
    var lines = event.target.value.split("\n");
    if (lines.length > 1) {
      console.log(lines[0]);
      this.setState({userAnswer: ""});
    } else {
      this.setState({userAnswer: lines[0]});
    }
  },

  handleCharacterKey: function(e) {
    if (e.key != "Enter") this.setState({userAnswer: this.state.userAnswer + e.key.toUpperCase()});
  },

  handleKeyDown: function(e) {
    if (e.key == "Enter") {
      this.props.callbacks.answer(this.state.userAnswer);
      this.setState({userAnswer: ""});
    } else if (e.key == "Backspace") {
      var answer = this.state.userAnswer;
      if (answer.length > 0) answer = answer.substring(0, answer.length - 1);
      this.setState({userAnswer: answer});
    }
  },

  render: function() {
    return (
      <div className="practice-section">
        <div className="practice-prompt">{this.props.question}</div>
        <textarea className="practice-answer" onKeyPress={this.handleCharacterKey}
                  onKeyDown={this.handleKeyDown} value={this.state.userAnswer}/>
      </div>
    );
  }
});
