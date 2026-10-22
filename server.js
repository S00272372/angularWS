const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const cars = [
  { _id: '507f1f77bcf86cd799439011', id: 1, make: 'Ford', model: 'Focus', year: 2021 },
  { _id: '507f1f77bcf86cd799439012', id: 2, make: 'Toyota', model: 'Corolla', year: 2023 },
  { _id: '507f1f77bcf86cd799439013', id: 3, make: 'Honda', model: 'Civic', year: 2022 },
];

app.get('/cars', (req, res) => {
  res.json(cars);
});

app.get('/cars/:id', (req, res) => {
  const { id } = req.params;
  const car = cars.find((item) => String(item._id) === id || String(item.id) === id);

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  return res.json(car);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
