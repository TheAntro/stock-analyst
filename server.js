const express = require('express');

// Import route files
const local = require('./routes/local');
const nasdaq = require('./routes/nasdaq');

const app = express();

// Mount routers
app.use('/api/local', local);
app.use('/api/nasdaq', nasdaq);

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
