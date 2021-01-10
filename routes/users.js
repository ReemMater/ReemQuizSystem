const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@Route     POST /api/users
//@Desc      Register a user
//@access    PUBLIC
router.post(
  '/',
  [
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'user already exist' });
        }

        user = new User({ name, email, password });

        //encrpt password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          {
            expiresIn: 36000,
          },
          (err, token) => {
            if (err) throw err;
            res.json(token);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  }
);

router.get('/users', async (req, res) => {
  let users = await User.find();

  if (users) return res.json(users);
});

router.put('/:id', async (req, res) => {
  const { grade } = req.body;
  //Build contact fields
  const userFields = {};
  if (grade) userFields.grade = grade;

  try {
    let user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ msg: 'Not Found' });

    user = await User.findByIdAndUpdate(req.params.id, {
      $set: { grade: grade },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
