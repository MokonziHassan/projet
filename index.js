// importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

var route = require('./routes/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connect
mongoose.connection.on('connected',()=>{
    console.log("connecté à la base de donnée mongodb @ 27017");
});

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("Erreur lors de la connexion à la base de donnée : " + err)
    }
    
});
//port number
const port = 3000;

//adding middleWare - cors
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing Server
app.get('/', (req, res)=>{
    res.send('foobar');
})
app.listen(port, ()=>{
    console.log("Server démarré sur le port "+ port);
})