const express = require('express');
const connectDb = require('./databasr/db');
const adminRouter = require('./routes/adminRoutes');
const projectRouter = require('./routes/projectRoutes');
const app = express();
const cors = require('cors');

app.use(cors());
// {origin: '*'}

app.use(express.json());
app.use('/',adminRouter)
app.use('/',projectRouter)


connectDb()
  .then(() => {
    console.log('connected to database');
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("failed to connect database", err);
  });