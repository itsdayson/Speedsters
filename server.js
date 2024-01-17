const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const controller = require('./controller');

// parses JSON from incoming request
app.use(express.json());

// serve the stats.html page when /stats is visited
app.get('/stats', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, './client/stats.html'));
});

app.get('/styles.css', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, './client/styles.css'));
});

// handle post requests to /stats
app.post('/stats', controller.getName, (req, res) => {
  return res.status(200).json({ color: res.locals.color });
});

// DO NOT USE express.static
app.use((req, res) =>
  res.status(404).sendFile(path.resolve(__dirname, './client/404.html'))
);

// Global error handling middleware
// How can we trigger this to run?
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
