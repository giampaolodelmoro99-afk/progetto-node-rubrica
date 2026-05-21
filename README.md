# 📑 Address Book API (Node.js & Express)

Questa è un'API RESTful per la gestione di una rubrica telefonica personale e protetta. Il progetto è focalizzato sullo sviluppo backend, implementando meccanismi di autenticazione sicura, isolamento dei dati tra utenti, e validazione rigorosa dell'input.

---

## 🚀 Caratteristiche Principali

* **Autenticazione (JWT):** Registrazione e Login protetti tramite hash delle password con `bcrypt` e sessioni gestite via JSON Web Tokens.
* **Isolamento dei Dati:** Ogni utente autenticato può visualizzare, creare, modificare o eliminare esclusivamente i propri contatti.
* **Integrità Referenziale (SQL):** Database relazionale ottimizzato con regole `ON DELETE CASCADE`. Eliminando un account utente o un contatto, tutti i dati collegati (telefoni ed email) vengono rimossi automaticamente per evitare dati orfani.
* **Validazione Rigorosa:** Controllo dei dati in ingresso (es. formati email, telefoni, lunghezze stringhe) tramite `express-validator` prima dell'interazione con il database.
* **Architettura Clean:** Suddivisione del codice organizzata secondo il pattern Routes-Controllers-Middlewares.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Database:** MariaDB 
* **Sicurezza e Autenticazione:** JSON Web Token (JWT), bcrypt
* **Validazione:** Express-Validator
* **Variabili d'Ambiente:** Dotenv
* **CORS:** Abilitato per future integrazioni frontend

---
