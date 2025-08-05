const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { trainerValidationRules, validate } = require('../middleware/validateTrainer');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', trainerController.getAll);
router.get('/:id', trainerController.getSingle);
router.post('/', isAuthenticated, trainerValidationRules, validate, trainerController.createTrainer);
router.put('/:id', isAuthenticated, trainerValidationRules, validate, trainerController.updateTrainer);
router.delete('/:id', isAuthenticated, trainerController.deleteTrainer);

module.exports = router;
