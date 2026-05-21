const express = require('express');
const router = express.Router();

const { getPhoneNumber, createPhoneNumber, updatePhoneNumber, deletePhoneNumber} = require('../controllers/phoneNumberController');

const {phoneNumberValidator} = require('../middlewares/validator');

const authenticateToken = require('../middlewares/auth');

router.get('/contact/:address_book_id', authenticateToken, getPhoneNumber);

router.post('/contact/:address_book_id', authenticateToken, phoneNumberValidator, createPhoneNumber);

router.put('/:id', authenticateToken, phoneNumberValidator, updatePhoneNumber);

router.delete('/:id', authenticateToken, deletePhoneNumber);

module.exports = router;