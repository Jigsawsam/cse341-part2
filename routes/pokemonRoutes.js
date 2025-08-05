const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');
const { pokemonValidationRules, validate } = require('../middleware/validatePokemon');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', pokemonController.getAll);
router.get('/:id', pokemonController.getSingle);
router.post('/', isAuthenticated, pokemonValidationRules, validate, pokemonController.createPokemon);
router.put('/:id', isAuthenticated, pokemonValidationRules, validate, pokemonController.updatePokemon);
router.delete('/:id', isAuthenticated, pokemonController.deletePokemon);

module.exports = router;
