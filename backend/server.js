const express = require('express');
const cors = require('cors');
const {initDb} = require('./db');

const authRoutes = require('./routes/authRoutes');

const addressBookRoutes = require('./routes/addressBookRoutes');

const phoneNumberRoutes = require('./routes/phoneNumberRoutes');

const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/addressBooks', addressBookRoutes);
app.use('/phone-numbers', phoneNumberRoutes);
app.use('/emails', emailRoutes);

initDb().then(()=>{
    app.listen(3000, () =>{
        console.log(`Server running on port 3000`);
    })
});
