// server.js
const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'G3nerico01',
    database: 'videojuegofinal' // Asegúrate de usar el nombre correcto de tu base de datos
});

db.connect(err => {
    if (err) { console.error('Error al conectar a la base de datos:', err); return; }
    console.log('Conectado a la base de datos');
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    // Asumimos que agregarás un campo para la contraseña hasheada en tu tabla de clientes
    // Este código inserta un nuevo cliente con un correo electrónico y una contraseña hasheada
    const query = 'INSERT INTO cliente (Email, PasswordHashed) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            res.json({message: 'Error al registrar el usuario'});
            return;
        }
        res.json({message: 'Usuario registrado exitosamente'});
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
