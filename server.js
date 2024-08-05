require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

const app = express()
require('dotenv').config();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { OrdersModel } = require('./models/OrdersModel');

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


app.use("/", authRoute);
app.use('/api/products', productRoute);

app.get('/allHoldings', async(req, res)=>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});
app.get('/allPositions', async(req, res)=>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});
app.get('/allOrders', async(req, res)=>{
    let allPositions = await OrdersModel.find({});
    res.json(allPositions);
});
// app.listen(PORT, ()=>{
//     console.log('app started');
//     mongoose.connect(uri);
//     console.log("DB connected");
// });
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log("DB connected");
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });