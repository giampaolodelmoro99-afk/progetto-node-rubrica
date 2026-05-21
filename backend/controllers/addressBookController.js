const {pool} = require('../db');


const getAddressBook = async (req, res) => {
    try{
        const rows = await pool.query(`
            SELECT 
                address_book.id,
                address_book.name,
                address_book.surname,
                address_book.qualification,
                address_book.city,
                address_book.street,
                address_book.house_number,
                phone_number.number,
                email.email
            FROM address_book
            LEFT JOIN phone_number ON address_book.id = phone_number.address_book_id
            LEFT JOIN email ON address_book.id = email.address_book_id
            WHERE address_book.user_id = ?`, [req.user.id]);

            res.json(rows);

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const createAddressBook = async (req, res) => {
    const {name, surname, qualification, city, street, house_number} = req.body;

    try{
        await pool.query(`INSERT INTO address_book (user_id, name, surname, qualification, city, street, house_number)
            VALUES (?, ?,?,?,?,?,?)`,
            [req.user.id, name, surname, qualification, city, street, house_number]
        );

        res.status(201).json({ message: 'Contatto creato con successo' });

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const updateAddressBook = async (req, res) => {
    const {name, surname, qualification, city, street, house_number} = req.body;
    const {id} = req.params;

    try{

        const address_book = await pool.query(`SELECT id FROM address_book WHERE id = ? AND user_id = ?`, [id, req.user.id]);

        if(address_book.length === 0) return res.status(404).json({ message: 'Contatto non trovato o non autorizzato' });

        await pool.query(`
            UPDATE address_book
            SET name = ?,
            surname = ?,
            qualification = ?,
            city = ?,
            street = ?,
            house_number = ?
            WHERE id = ?
            `,[name, surname, qualification, city, street, house_number, id]);

        res.status(200).json({ message: 'Contatto aggiornato con successo' });

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }

};

const deleteAddressBook = async (req, res) => {
    const {id} = req.params;

    try{
        const result = await pool.query(`
            DELETE FROM address_book WHERE id = ? AND user_id = ?`, [id, req.user.id]);

        if(result.affectedRows === 0) return res.status(404).json({ message: 'Contatto non trovato o non autorizzato' });

        res.status(200).json({ message: 'Contatto eliminato con successo' });

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

module.exports = {
    getAddressBook,
    createAddressBook,
    updateAddressBook,
    deleteAddressBook
}