const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', (req, res) => {
  // #swagger.summary = 'Get all contacts'
  contactsController.getAll(req, res);
});

// GET single contact by ID
router.get('/:id', (req, res) => {
  // #swagger.summary = 'Get a single contact by ID'
  contactsController.getSingle(req, res);
});

// POST create a new contact
router.post('/', (req, res) => {
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
  contactsController.createContact(req, res);
});

// PUT update a contact by ID
router.put('/:id', (req, res) => {
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
  contactsController.updateContact(req, res);
});

// DELETE a contact by ID
router.delete('/:id', (req, res) => {
  // #swagger.summary = 'Delete a contact by ID'
  contactsController.deleteContact(req, res);
});

module.exports = router;
