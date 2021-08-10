const express= require("express");
const cors = require('cors');
const city = require('./routes/city');
const area = require('./routes/area');
const user = require('./routes/user');
const app = express();
require("./Database/connection");
//------Static file middleware-----//
var PORT=process.env.PORT || 4000;
app.use(express.static(__dirname));

//------Enable CORS-----//

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

//------express middleware-----//
app.use(express.json());

app.use('/api/city', city)
app.use('/api/user', user)
// app.use('/api/area', area);

//------Database connection-----//

console.log(process.env.DATABASE_CONECTION)

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Abubakar:DfohKvcRnMz7UOjm@cluster0.z1hqb.mongodb.net/carzclan",
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
  })
  .then(() => console.log("Connected to carzclan...."))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
 res.send("hi from Carzclan....");
});

app.listen(PORT,()=>{
  console.log("listening on port 4000")
 // console.log(process.env.NODE_ENV)  
});
