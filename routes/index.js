const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('CSE341 Project 2');
});

router.use('/pokemon', require('./pokemonRoutes'));

module.exports = router;