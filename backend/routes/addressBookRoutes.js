const express = require('express');
const router = express.Router();

const {getAddressBook, createAddressBook, updateAddressBook, deleteAddressBook} = require('../controllers/addressBookController');

const {addressBookValidator} = require('../middlewares/validator');

const authenticateToken = require('../middlewares/auth');


router.get('/', authenticateToken, getAddressBook);

router.post('/', authenticateToken, addressBookValidator, createAddressBook);

router.put('/:id', authenticateToken, addressBookValidator, updateAddressBook);

router.delete('/:id', authenticateToken, deleteAddressBook);

module.exports = router;