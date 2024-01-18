const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');

const app = express();

// parses JSON from incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/', router);

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// serve the stats.html page when /stats is visited
// app.get('/stats', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, './client/stats.html'));
// });

// app.get('/styles.css', (req, res) => {
//   return res
//     .status(200)
//     .sendFile(path.resolve(__dirname, './client/styles.css'));
// });

// // handle post requests to /stats
// app.post('/stats', controller.getName, (req, res) => {
//   return res.status(200).json({ getStats: res.locals.text });
// });

// // DO NOT USE express.static
// app.use((req, res) =>
//   res.status(404).sendFile(path.resolve(__dirname, './client/404.html'))
// );

// // Global error handling middleware
// // How can we trigger this to run?
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}...`);
// });
