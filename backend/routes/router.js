const express = require('express');
const router = express.Router();

// Temporary storage for user data
const userData = [
  {
    name: '',
    fiveK: '',
    tenK: '',
    halfMarathon: '',
    marathon: '',
  },
];

// GET route to retrieve user data
router.get('/stats', (req, res) => {
  res.send(userData);
});

// POST route to save user data
router.post('/stats', (req, res) => {
  const newData = req.body;

  // Add the new data to the userData array
  userData.push(newData);

  res.status(201).json({ message: 'Data saved successfully', newData });
});

module.exports = router;
