const {pool} = require('../db');

const createPhoneNumber = async (req, res) => {
    const {number} = req.body;
    const {address_book_id} = req.params;

    try{

        const addressBook = await pool.query(`SELECT id FROM address_book WHERE id = ? AND user_id = ?`
            ,[address_book_id, req.user.id]
        );
        if (addressBook.length === 0) return res.status(404).json({ message: 'Contatto non trovato' });

        await pool.query(`
            INSERT INTO phone_number (address_book_id, number) VALUES (?, ?)`,[address_book_id, number]);

        res.status(201).json({ message: 'Numero di telefono creato' });

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const updatePhoneNumber = async (req, res) => {
    const {number} = req.body;
    const {id} = req.params;

    try{

        const rows = await pool.query(`
            SELECT phone_number.id FROM phone_number JOIN address_book ON phone_number.address_book_id = address_book.id WHERE phone_number.id = ? AND address_book.user_id = ?
            `, [id, req.user.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Numero di telefono non trovato o non autorizzato' });
        }

        await pool.query(`
            UPDATE phone_number
            SET number = ?
            WHERE id = ?`, [number, id]);

        res.status(200).json({ message: 'Numero di telefono aggiornato con successo' });
        
    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const deletePhoneNumber = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const rows = await pool.query(`
            SELECT phone_number.id 
            FROM phone_number 
            JOIN address_book ON phone_number.address_book_id = address_book.id 
            WHERE phone_number.id = ? AND address_book.user_id = ?
        `, [id, req.user.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Numero di telefono non trovato o non autorizzato' });
        }

        
        await pool.query(`
            DELETE FROM phone_number WHERE id = ?
        `, [id]);

        res.status(200).json({ message: 'Numero di telefono eliminato con successo' });

    } catch (err) {
        res.status(500).json({ message: 'Errore server' });
    }
};

module.exports = {
    createPhoneNumber,
    updatePhoneNumber,
    deletePhoneNumber,
}