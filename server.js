// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const connectDb = require('./databasr/db');
// const adminRouter = require('./routes/adminRoutes');
// const projectRouter = require('./routes/projectRoutes');
// const app = express();
// const cors = require('cors');
// const expRouter = require('./routes/expRoutes');
// const skillsRouter = require('./routes/skillsRoutes');
// const userRouter = require('./routes/userRoutes');
// const cookieParser = require('cookie-parser');

// app.use(cors({
//   origin: process.env.VITE_FRONT_END,
//   credentials: true
// }));


// app.use(express.json());
// app.use(cookieParser())
// app.use('/',adminRouter)
// app.use('/',projectRouter)
// app.use('/',expRouter)
// app.use('/',skillsRouter)
// app.use('/',userRouter)


// const PORT = process.env.PORT || 3000

// connectDb()
//   .then(() => {
//     console.log('connected to database');
//     app.listen(PORT, () => {
//       console.log(`server started on ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("failed to connect database", err);
//   });






const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDb = require('./databasr/db');
const adminRouter = require('./routes/adminRoutes');
const projectRouter = require('./routes/projectRoutes');
const expRouter = require('./routes/expRoutes');
const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: process.env.VITE_FRONT_END,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/', adminRouter);
app.use('/', projectRouter);
app.use('/', expRouter);
app.use('/', skillsRouter);
app.use('/', userRouter);

const PORT = process.env.PORT || 3000;

connectDb()
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("failed to connect database", err);
    // ✅ Start server anyway so Render can bind the port
    app.listen(PORT, () => {
      console.log(`server started on ${PORT} (DB failed)`);
    });
  });
