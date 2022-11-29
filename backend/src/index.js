import express from 'express';
import autocompRoute from './router.js';
import searchRoute from './SearchRoute.js';
import activityRoute from './activityRoute.js';
import dealsRoute from './dealsRoute.js'
import morgan from 'morgan';
import cors from 'cors';
// import * as path from 'path';
// import * as url from 'url';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// ===> Setting the server
const app = express();
const PORT = 1338;

app.use(morgan('dev'));

app.use(cors({ origin: '*' }));

//===> Applying handler for API

app.use('/', autocompRoute);
app.use('/', searchRoute);
app.use('/', activityRoute);
app.use('/', dealsRoute);

//===> Static files

app.use(express.static('../react/build'));

app.get('/', (req, res) => {
  res.sendFile('../react/build/index.html', { root: '.' });
});

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
