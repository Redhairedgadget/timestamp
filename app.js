//Imports for node.js
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Create instance of express and instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

//Importing data from static files and setting up view
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//GET to return JSON that formats natural and unix date
app.get('/:date', function(req, res, next){
    var date = req.params.date;

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    if(isNaN(date)){
        var naturalDate = new Date(date);
        naturalDate = naturalDate.toLocaleDateString('en-us', options);
        var unixDate = new Date(date).getTime()/1000;
    }else{
        var unixDate = date;
        var naturalDate = new Date(date * 1000);
        naturalDate = naturalDate.toLocaleDateString('en-us', options);
    };
  
    if(naturalDate == "Invalid Date" || unixDate == "Invalid Date"){
       res.json({error: "Invalid Date"})
    }else{
        res.json({unix: unixDate, natural: naturalDate});
    }
});

app.listen(process.env.PORT);