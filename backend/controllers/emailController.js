const {pool} = require('../db');

const createEmail = async (req, res) => {
    const {email} = req.body;
    const {address_book_id} = req.params;

    try{

        const addressBook = await pool.query(`SELECT id FROM address_book WHERE id = ? AND user_id = ?`
            ,[address_book_id, req.user.id]
        );
        if (addressBook.length === 0) return res.status(404).json({ message: 'Contatto non trovato' });

        await pool.query(`
            INSERT INTO email (address_book_id, email) VALUES (?, ?)`,[address_book_id, email]);

        res.status(201).json({ message: 'Email creata con successo' });

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const updateEmail = async (req, res) => {
    const {email} = req.body;
    const {id} = req.params;

    try{
        const rows = await pool.query(`
            SELECT email.id FROM email JOIN address_book ON email.address_book_id = address_book.id WHERE email.id = ? AND address_book.user_id = ?`
        ,[id, req.user.id]);

    if(rows.length === 0) return res.status(404).json({message : 'Email non trovata o non autorizzato'});

    await pool.query(`
        UPDATE email
        SET email = ?
        WHERE id = ?
        `,[email, id]);

    res.status(200).json({message : 'Email aggiornata con successo'});

    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

const deleteEmail = async (req, res) => {
    const {id} = req.params;

    try{
        const rows = await pool.query(`
            SELECT email.id
            FROM email
            JOIN address_book
            ON email.address_book_id = address_book.id
            WHERE email.id = ? AND address_book.user_id = ?`,[id, req.user.id]);
        
        if(rows.length === 0) return res.status(404).json({message : 'Email non trovata o non autorizzato'});

        await pool.query(`
            DELETE FROM email WHERE id = ?`,[id]);

        res.status(200).json({message : 'Email eliminata con successo'});
    }catch(err){
        res.status(500).json({ message: 'Errore server' });
    }
};

module.exports = {
    createEmail,
    updateEmail,
    deleteEmail
}