const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.1.3.202';

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// MySQL Database connection
const db = mysql.createConnection({
    host: 'vz536877.mysql.tools', // replace with your database host
    user: 'vz536877_tabletoplogin', // replace with your database username
    password: 'HcE856-a;f', // replace with your database password
    database: 'vz536877_tabletoplogin', // replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1); // Завершити програму, якщо підключення не вдалося
    } else {
        console.log('Connected to MySQL database');
    }
});


// Registration endpoint
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(sql, [username, email, password], (err, results) => {
        if (err) {
            console.error('Помилка SQL-запиту:', err); // Додане логування помилки
            return res.status(500).json({ message: 'Помилка реєстрації', error: err });
        }
        console.log('Результати SQL-запиту:', results); // Логування результату для перевірки
        res.status(201).json({ message: 'Користувач успішно зареєстрований' });
    });
});


// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Login failed' });
        }

        if (results.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

const directoryPath = path.join(__dirname, 'CharactersData');
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log('Папка CharactersData створена');
}

// Ендпоінт для отримання всіх персонажів
app.get('/api/characters', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Не вдалося завантажити персонажів' });
        }

        const characterData = files.map((file) => {
            const filePath = path.join(directoryPath, file);
            const rawData = fs.readFileSync(filePath);
            return JSON.parse(rawData);
        });

        res.json(characterData);
    });
});

// Ендпоінт для додавання нового персонажа
app.post('/api/characters', (req, res) => {
    console.log('Новий запит на збереження персонажа:', req.body); // Додає лог для перевірки запиту
    const character = req.body;
    const uniqueId = uuidv4();  // Генерація унікального ідентифікатора
    character.id = uniqueId;    // Додаємо його до даних персонажа

    const filePath = path.join(directoryPath, `${uniqueId}.json`); // Використовуємо id як ім'я файлу

    // Перевірка, чи існує каталог, якщо ні — створюємо його
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Записуємо дані персонажа в файл
    fs.writeFile(filePath, JSON.stringify(character, null, 2), (err) => {
        if (err) {
            console.error('Помилка запису файлу:', err);
            return res.status(500).json({ error: 'Не вдалося зберегти персонажа' });
        }
        res.status(201).json({ message: 'Персонаж успішно доданий', id: uniqueId });
    });
});

// Відповідь для всіх інших запитів - індексний файл React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, HOST, () => {
    console.log(`Сервер запущено на http://${HOST}:${PORT}`);
});
