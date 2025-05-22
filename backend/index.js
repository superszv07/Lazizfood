// require('dotenv').config()
// const path= require('path')
// const express = require('express')
// const app = express()
// const port = 5000

// const mongoDB =require("./db")
// mongoDB();

// const PORT = process.env.PORT || port
// const dirname = path.resolve();


// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept");
//   next();
// })


// app.use(express.json())//add express json otherwise it will not work
// app.use('/api', require("./Routes/CreateUser"));//to hit createUser end point
// app.use('/api', require("./Routes/DisplayData"));
// app.use('/api', require("./Routes/OrderData"));

// app.use(express.static(path.join(dirname, "/frontend/build")));
// app.get('*',(req,res)=>{res.sendFile(path.resolve(dirname,"frontend" ,"build","index.html" ));})
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

require('dotenv').config()
const path= require('path')
const express = require('express')
const app = express()
const port = 5000

const mongoDB =require("./db")
mongoDB();

const PORT = process.env.PORT || port
const dirname = path.resolve();


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept");
  next();
})


app.use(express.json())//add express json otherwise it will not work
app.use('/api', require("./Routes/CreateUser"));//to hit createUser end point
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require('./Routes/GetUserData'));

app.use(express.static(path.join(dirname, "/frontend/build")));
app.get('*',(req,res)=>{res.sendFile(path.resolve(dirname,"frontend" ,"build","index.html" ));})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})