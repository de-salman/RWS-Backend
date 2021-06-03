const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')
var exphbs  = require('express-handlebars');
var fileupload = require('express-fileupload')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
var db=require('./config/connection')

app.use(session({secret:'Keep it secret',
name:'uniqueSessionID',
resave: true,
saveUninitialized: true}))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static(__dirname+'/public'));
app.use('/admin', express.static(__dirname+'/public'));
app.use(fileupload())
db.connect((err)=>{
    if(err) { console.log("connection failed" + err) }
    else console.log("database")

})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const productRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const adminRouter = require('./routes/admin');
const loginRouter = require('./routes/login');



app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});