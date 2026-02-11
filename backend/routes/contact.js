const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    res.status(201).json({ success: true, message: 'Contact saved ✓', data: contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Retrieve all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Retrieve single contact
router.get('/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Delete contact
router.delete('/contact/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
