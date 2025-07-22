const express = require('express');
const bodyParser = require('body-parser');
const pokemonRoutes = require('./routes/pokemonRoutes');
const { initDB } = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));
app.use('/pokemon', pokemonRoutes);

initDB((err) => {
  if (err) {
    console.error('Failed to connect to DB:', err);
  } else {
    app.listen(port, () => console.log(`Server running on port ${port} | http://localhost:${port}/`));
  }
});
