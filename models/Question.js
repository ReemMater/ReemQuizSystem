const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  questiontext: {
    type: String,
    required: true,
  },
  choice1: {
    type: String,
    required: true,
  },
  choice2: {
    type: String,
    required: true,
  },
  choice3: {
    type: String,
    required: true,
  },
  choice4: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('question', QuestionSchema);
