const mongodb = require('mongodb');

// GET all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await req.db
      .collection('contacts')
      .find()
      .toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single contact by ID
const getSingle = async (req, res) => {
  try {
    const id = new mongodb.ObjectId(req.params.id);
    const contact = await req.db
      .collection('contacts')
      .findOne({ _id: id });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create a new contact
const createContact = async (req, res) => {
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
};

// PUT update a contact by ID
const updateContact = async (req, res) => {
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
};

// DELETE a contact by ID
const deleteContact = async (req, res) => {
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
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
