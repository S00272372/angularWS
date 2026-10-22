const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const cars = [
  { id: 1, make: 'Ford', model: 'Focus', year: 2021 },
  { id: 2, make: 'Toyota', model: 'Corolla', year: 2023 },
  { id: 3, make: 'Honda', model: 'Civic', year: 2022 },
];

app.get('/cars', (req, res) => {
  res.json(cars);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
