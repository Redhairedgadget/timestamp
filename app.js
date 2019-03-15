//Imports for node.js
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Create instance of express and instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());


//GET to return JSON that formats natural and unix date
app.get('/data/:date', function(req, res, next){
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

    res.json({unix: unixDate, natural: naturalDate});
});
