const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    if (req.session.user) {
      const name = req.session.user.displayName || req.session.user.username || req.session.user.login;
      res.send(`Logged in as ${name}`);
    } else {
      res.send('Logged Out');
    }
  });
  

router.use('/pokemon', require('./pokemonRoutes'));
router.use('/trainers', require('./trainerRoutes'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;