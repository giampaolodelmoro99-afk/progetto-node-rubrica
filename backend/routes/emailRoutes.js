const express = require('express');
const router = express.Router();

const {getEmail, createEmail, updateEmail, deleteEmail} = require('../controllers/emailController');

const {emailValidator} = require('../middlewares/validator');

const authenticateToken = require('../middlewares/auth');

router.get('/contact/:address_book_id', authenticateToken, getEmail);

router.post('/contact/:address_book_id', authenticateToken, emailValidator, createEmail);

router.put('/:id', authenticateToken, emailValidator, updateEmail);

router.delete('/:id', authenticateToken, deleteEmail);

module.exports = router;