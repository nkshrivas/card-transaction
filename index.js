const express = require('express');
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();

app.use(express.json());

app.use('/api', itemsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
