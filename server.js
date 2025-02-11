const { writeFile } = require('fs');
let data = require('./public/db/data.json');
const express = require('express')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/data', (req, res) => {
    res.json(data);
});

app.post('/api/data', (req, res) => {
    data = req.body;
    writeFile('./public/db/data.json', JSON.stringify(data, null, 2), err => {
        if (err) throw err;
    });
    console.log(data);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});