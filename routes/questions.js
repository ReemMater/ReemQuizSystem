const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Question = require('../models/Question');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

//@Route     GET /api/question
//@Desc      Get questions
//@access    PRIVATE
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@Route     POST /api/question
//@Desc      Add new questions
//@access    PRIVATE
router.post(
  '/',
  [
    [
      check('questiontext').not().isEmpty(),
      check('choice1').not().isEmpty(),
      check('choice2').not().isEmpty(),
      check('choice3').not().isEmpty(),
      check('choice4').not().isEmpty(),
      check('correct').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      questiontext,
      choice1,
      choice2,
      choice3,
      choice4,
      correct,
    } = req.body;

    try {
      const newQuestion = new Question({
        questiontext,
        choice1,
        choice2,
        choice3,
        choice4,
        correct,
      });

      let question = await newQuestion.save();
      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@Route     PUT /api/question:/id
//@Desc      Update questions
//@access    PRIVATE
router.put('/:id', async (req, res) => {
  const {
    questiontext,
    choice1,
    choice2,
    choice3,
    choice4,
    correct,
  } = req.body;

  //Build contact fields
  const questionFields = {};
  if (questiontext) questionFields.questiontext = questiontext;
  if (choice1) questionFields.choice1 = choice1;
  if (choice2) questionFields.choice2 = choice2;
  if (choice3) questionFields.choice3 = choice3;
  if (choice4) questionFields.choice4 = choice4;
  if (correct) questionFields.correct = correct;
  try {
    let question = await Question.findById(req.params.id);
    if (!question) res.status(404).json({ msg: 'Not Found' });

    question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: questionFields,
      },
      { new: true }
    );

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@Route     DELETE /api/question/:id
//@Desc      Delete questions
//@access    PRIVATE
router.delete('/:id', async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);
    if (!question) res.status(404).json({ msg: 'Not Found' });

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Question Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
