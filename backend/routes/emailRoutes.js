const express = require('express');
const router = express.Router();

const {createEmail, updateEmail, deleteEmail} = require('../controllers/emailController');

const {emailValidator} = require('../middlewares/validator');

const authenticateToken = require('../middlewares/auth');

router.post('/contact/:address_book_id', authenticateToken, emailValidator, createEmail);

router.put('/:id', authenticateToken, emailValidator, updateEmail);

router.delete('/:id', authenticateToken, deleteEmail);

module.exports = router;