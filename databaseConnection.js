const mongoose = require('mongoose');

function connectDB() {
  const DB_URL = process.env.MONGO_URL;

  mongoose.connect(DB_URL);

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('connection error:', err);
  });

  db.once('open', () => {
    console.log('db connected ');
  });
}

module.exports = connectDB;
