var KanaPracticeApp = React.createClass({
  answerQuestion: function(answer) {
    console.log(answer);
  },

  render: function() {
    var callbacks = {answer: this.answerQuestion}
    return (
      <div className="app-wrapper">
        <div className="app-header">
          <div className="app-title">Kana Practice</div>
        </div>
        <div className="app-body">
          <div className="practice-section-wrapper">
            <PracticeSection question="Question" callbacks={callbacks}/>
          </div>
        </div>
      </div>
    );
  }
});
