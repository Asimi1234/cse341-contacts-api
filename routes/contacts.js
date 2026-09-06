const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// GET all contacts
router.get('/', async (req, res) => {
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

module.exports = router;