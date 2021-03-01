const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/config.env'});

// Import route files
const local = require('./routes/local');

const app = express();

// Mount routers
app.use('/api/local', local);

// Error handler
app.use((error, req, res, next) => {
  if (error.code === 'ENOENT') {
    res.status(404).json({ message: error.message });
  } else {
    res.status(500).json({ message: error.message });
  }
})

// Start listening on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
