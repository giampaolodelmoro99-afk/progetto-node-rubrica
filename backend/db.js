const mariadb = require('mariadb');
const dotenv = require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 50
});

async function initDb() {
    let conn;
    try {

        conn = await pool.getConnection();

        await conn.query(`
        CREATE TABLE IF NOT EXISTS users(
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(250) NOT NULL
            )
        `);
        
        await conn.query(`
        CREATE TABLE IF NOT EXISTS address_book(
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            qualification VARCHAR(50) NOT NULL,
            city VARCHAR(50),
            street VARCHAR(50),
            house_number INT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await conn.query(`
        CREATE TABLE IF NOT EXISTS phone_number(
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            address_book_id INT UNSIGNED NOT NULL,
            number VARCHAR(20),
            FOREIGN KEY (address_book_id) REFERENCES address_book(id) ON DELETE CASCADE
            )
        `);

        await conn.query(`
        CREATE TABLE IF NOT EXISTS email(
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            address_book_id INT UNSIGNED NOT NULL,
            email VARCHAR(100) NOT NULL,
            FOREIGN KEY (address_book_id) REFERENCES address_book(id) ON DELETE CASCADE
            )
        `);

        console.log("Tabelle create con successo!");

    } catch(err) {
        console.error('Errore database: ', err);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = { pool, initDb };