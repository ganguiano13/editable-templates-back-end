import express from 'express';
import fs from 'fs';
import cors from 'cors';
import data from './data.json' with { type: 'json' };

const app = express();
const port = 3000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.post('/modify-json', (req, res) => {
  const newData = req.body;

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const jsonData = JSON.parse(data);
    const updatedData = { ...jsonData, ...newData };

    fs.writeFile('./data.json', JSON.stringify(updatedData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }
      res.send('File updated successfully');
    });
  });
});

app.get('/data', (req, res) => {
  res.json(data)
});

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});