const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
  // #swagger.summary = 'Get all contacts'
  try {
    const contacts = await req.db
      .collection('contacts')
      .find()
      .toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
  // #swagger.summary = 'Get a single contact by ID'
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const contact = await req.db
      .collection('contacts')
      .findOne({ _id: id });
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new contact
router.post('/', async (req, res) => {
  // #swagger.summary = 'Create a new contact'
  /* #swagger.parameters['body'] = {
       in: 'body',
       description: 'Contact to create. All fields are required.',
       required: true,
       schema: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         favoriteColor: 'blue',
         birthday: '1990-01-01'
       }
  } */
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // All fields are required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error:
          'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await req.db.collection('contacts').insertOne(contact);

    // Return the new contact id in the response body
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a contact by ID
router.put('/:id', async (req, res) => {
  // #swagger.summary = 'Update a contact by ID'
  /* #swagger.parameters['body'] = {
       in: 'body',
       description: 'Updated contact data. All fields are required.',
       required: true,
       schema: {
         firstName: 'John',
         lastName: 'Doe',
         email: 'john.doe@example.com',
         favoriteColor: 'blue',
         birthday: '1990-01-01'
       }
  } */
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // All fields are required
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error:
          'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const contact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await req.db
      .collection('contacts')
      .replaceOne({ _id: id }, contact);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  // #swagger.summary = 'Delete a contact by ID'
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const result = await req.db
      .collection('contacts')
      .deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;