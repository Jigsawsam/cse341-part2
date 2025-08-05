
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all Trainers
const getAll = async (req, res) => {
  //#swagger.tags=['Trainer']
  try {
    const result = await mongodb.getDatabase().collection('trainers').find();
    const trainers = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainers', details: error.message });
  }
};

// GET a single Trainer by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Trainer']
  try {
    const trainerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('trainers').find({ _id: trainerId });
    const trainers = await result.toArray();

    if (!trainers[0]) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trainers[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trainer', details: error.message });
  }
};

// POST - Create new Trainer
const createTrainer = async (req, res) => {
  //#swagger.tags=['Trainer']
  try {
    const trainer = {
      name: req.body.name,
      age: req.body.age
    };

    const response = await mongodb.getDatabase().collection('trainers').insertOne(trainer);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create trainer' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trainer', details: error.message });
  }
};

// PUT - Update Trainer
const updateTrainer = async (req, res) => {
  //#swagger.tags=['Trainer']
  try {
    const trainerId = new ObjectId(req.params.id);

    const trainer = {
      name: req.body.name,
      age: req.body.age
    };

    const response = await mongodb.getDatabase().collection('trainers').replaceOne({ _id: trainerId }, trainer);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Trainer not found or data unchanged' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trainer', details: error.message });
  }
};

// DELETE Trainer
const deleteTrainer = async (req, res) => {
  //#swagger.tags=['Trainer']
  try {
    const trainerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('trainers').deleteOne({ _id: trainerId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Trainer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trainer', details: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrainer,
  updateTrainer,
  deleteTrainer
};
