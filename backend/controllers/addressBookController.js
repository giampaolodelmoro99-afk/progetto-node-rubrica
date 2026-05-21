const {pool} = require('../db');


const getAddressBook = async (req, res) => {
    try{
        const rows = await pool.query(`
            SELECT id, name, surname, qualification, city, street, house_number
            FROM address_book
            WHERE user_id = ?`, [req.user.id]);
            
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

        if(!result || result.affectedRows === 0) return res.status(404).json({ message: 'Contatto non trovato o non autorizzato' });

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