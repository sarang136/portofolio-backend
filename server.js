const express = require('express');
const connectDb = require('./databasr/db');
const adminRouter = require('./routes/adminRoutes');
const projectRouter = require('./routes/projectRoutes');
const app = express();
const cors = require('cors');
const expRouter = require('./routes/expRoutes');
const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

app.use(cors());
// {origin: '*'}

app.use(express.json());
app.use(cookieParser())
app.use('/',adminRouter)
app.use('/',projectRouter)
app.use('/',expRouter)
app.use('/',skillsRouter)
app.use('/',userRouter)


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