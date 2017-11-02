var KanaPracticeApp = React.createClass({
  getInitialState: function() {
    return {
      charSets: {},
      currentQuestion: null,
      correct: false,
      missed: null
    };
  },

  componentDidMount: function() {
    $.ajax({
      url: "/characters/hiragana.json"
    }).done(function(response) {
      this.addCharacterSet("hiragana", response);
    }.bind(this));
  },

  addCharacterSet: function(name, set) {
    var charSets = this.state.charSets;
    charSets[name] = set;
    var currentQuestion = this.state.currentQuestion || this.getRandomCharacter(set);
    this.setState({charSets: charSets, currentQuestion: currentQuestion});
  },

  getRandomCharacter: function(charSet) {
    var chars = Object.keys(charSet);
    return chars && chars[Math.floor(Math.random() * chars.length)];
  },

  answerQuestion: function(answer) {
    if (answer.toLowerCase() == this.state.charSets["hiragana"][this.state.currentQuestion]) {
      this.setState({correct: true});
      setTimeout(this.nextQuestion, 500);
    } else {
      this.setState({missed: this.state.charSets["hiragana"][this.state.currentQuestion]});
    }
  },

  nextQuestion: function() {
    var question = this.getRandomCharacter(this.state.charSets["hiragana"]);
    this.setState({correct: false, missed: null, currentQuestion: question});
  },

  render: function() {
    var callbacks = {answer: this.answerQuestion, nextQuestion: this.nextQuestion};
    var question = this.state.currentQuestion;
    return (
      <div className="app-wrapper">
        <div className="app-header">
          <div className="app-title">Kana Practice</div>
        </div>
        <div className="app-body">
          <div className="practice-section-wrapper">
            <PracticeSection question={question} callbacks={callbacks} correct={this.state.correct} missed={this.state.missed}/>
          </div>
        </div>
      </div>
    );
  }
});
