
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = 5000;

const mongoDB = require("./db");
mongoDB();

const PORT = process.env.PORT || port;
const dirname = path.resolve();

// ✅ CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ✅ Limit set BEFORE routes — only once
app.use(express.json({ limit: '10mb' }));//add express json otherwise it will not work by default it is 100kb so change limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // for form data (optional)

// ✅ Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require('./Routes/GetUserData'));
app.use('/api', require('./Routes/UserUpdate'));

// ✅ Serve frontend
app.use(express.static(path.join(dirname, "/frontend/build")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(dirname, "frontend", "build", "index.html"));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
