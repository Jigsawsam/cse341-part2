const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all Pokémon
const getAll = async (req, res) => {
  //#swagger.tags=['Pokemon']
  try {
    const result = await mongodb
      .getDatabase()
      .collection('pokemon')
      .find();

    const pokemon = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon', details: error.message });
  }
};

// GET a single Pokémon by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['Pokemon']
  try {
    const pokemonId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .collection('pokemon')
      .find({ _id: pokemonId });

    const pokemon = await result.toArray();

    if (!pokemon[0]) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(pokemon[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokémon', details: error.message });
  }
};

// POST - Create new Pokémon
const createPokemon = async (req, res) => {
  //#swagger.tags=['Pokemon']
  try {
    const pokemon = {
      name: req.body.name,
      type: req.body.type,
      level: req.body.level,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      moves: req.body.moves,
    };

    const response = await mongodb
      .getDatabase()
      .collection('pokemon')
      .insertOne(pokemon);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create Pokémon' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Pokémon', details: error.message });
  }
};

// PUT - Update Pokémon
const updatePokemon = async (req, res) => {
  //#swagger.tags=['Pokemon']
  try {
    const pokemonId = new ObjectId(req.params.id);

    const pokemon = {
      name: req.body.name,
      type: req.body.type,
      level: req.body.level,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      moves: req.body.moves,
    };

    const response = await mongodb
      .getDatabase()
      .collection('pokemon')
      .replaceOne({ _id: pokemonId }, pokemon);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pokémon not found or data is the same' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Pokémon', details: error.message });
  }
};

// DELETE Pokémon
const deletePokemon = async (req, res) => {
  //#swagger.tags=['Pokemon']
  try {
    const pokemonId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection('pokemon')
      .deleteOne({ _id: pokemonId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pokémon not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Pokémon', details: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createPokemon,
  updatePokemon,
  deletePokemon,
};

