const db = require('../models/starWarsModels');

const controller = {
  // add a method called 'getColor'
  getStats: function (req, res, next) {
    const { name, pace, fiveK, tenK, halfMarathon, marathon } = req.body;

    const params = [name, pace, fiveK, tenK, halfMarathon, marathon];
    const text =
      'INSERT INTO RUNNER (name, pace, fiveK, tenK, halfMarathon, Marathon) VALUES($1, $2, $3, $4, $5, $6)';
    db.query(text, params)
      .then((data) => {
        res.locals.newRunner = data;
        next();
      })
      .catch((error) => {
        console.error('Error in addCharacter: ', error);
        next({
          log: 'Express error handler caught in addCharacter controller',
          status: 500,
          message: { err: 'An error in addCharacter controller' },
        });
      });
  },
};

// Export the controller object
module.exports = controller;
