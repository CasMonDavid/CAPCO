const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor Express funcionando!' });
});

mongoose.connect('mongodb://localhost:27017/gestor_exp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
  app.listen(3001, () => console.log('Backend en http://localhost:3001'));
}).catch(err => console.error(err));
