const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const contactsRoutes = require('./routes/contacts');

app.use(express.json());

let db;
const client = new MongoClient(process.env.MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('cse341');
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return false;
  }
}

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.get('/', (req, res) => {
  res.send('API is running');
});

// Use contacts routes
app.use('/api/contacts', contactsRoutes);

async function startServer() {
  const connected = await connectDB();
  if (connected) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } else {
    console.error('Failed to start server');
  }
}

startServer();