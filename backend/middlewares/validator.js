const {body, validationResult} = require('express-validator');

const validate = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        
        return res.status(400).json({message: 'dati non validi', error: errors.array()});
    }

    next();

};

const registerValidator = [
    body('name')
        .isString()
        .withMessage('Il nome non è valido')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Il nome inserito deve essere un testo lungo tra 2 e 50 caratteri'),

    body('surname')
        .isString()
        .withMessage('Il cognome non è valido')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Il cognome inserito deve essere un testo lungo tra 2 e 50 caratteri'),

    body('email')
        .isEmail()
        .withMessage("L'email inserita non è valida")
        .isLength({ max: 100 })
        .withMessage("L'email non può superare i 100 caratteri") 
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La password deve contenere almeno 6 caratteri'),

    validate
];

const loginValidator = [
    body('email')
        .isEmail()
        .withMessage("L'email inserita non è valida")
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('La password è obbligatoria'),

    validate
];

const addressBookValidator = [
    body('name')
        .isString()
        .withMessage('Il nome non è valido')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Il nome del contatto deve essere lungo tra 2 e 50 caratteri'),

    body('surname')
        .isString()
        .withMessage('Il cognome non è valido ')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Il cognome del contatto deve essere lungo tra 2 e 50 caratteri'),

    body('qualification')
        .isString()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('La qualifica deve essere valida (es. "Collega", "Amico")'),

    body('city')
        .optional({ checkFalsy: true })
        .isString()
        .trim()
        .isLength({ max: 50 })
        .withMessage('La città non può superare i 50 caratteri'),

    body('street')
        .optional({ checkFalsy: true })
        .isString()
        .trim()
        .isLength({ max: 50 })
        .withMessage('La via non può superare i 50 caratteri'),

    body('house_number')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 }) 
        .withMessage('Il numero civico deve essere un numero intero valido'),

    validate 
];

const phoneNumberValidator = [
    body('number')
        .notEmpty()
        .withMessage('Il numero di telefono è obbligatorio')
        .isMobilePhone('any')
        .withMessage('Il numero di telefono inserito non è valido')
        .isLength({ max: 20 })
        .withMessage('Il numero di telefono non può superare i 20 caratteri'),

    validate 
];

const emailValidator = [
    body('email')
        .isEmail()
        .withMessage("L'email inserita non è valida")
        .isLength({ max: 100 })
        .withMessage("L'email non può superare i 100 caratteri") 
        .normalizeEmail(),

        validate
];

module.exports = {
    registerValidator,
    loginValidator,
    addressBookValidator,
    phoneNumberValidator,
    emailValidator
}