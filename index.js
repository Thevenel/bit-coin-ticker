//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    // console.log(req.body.crypto);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        },
        headers: {
            "Authorization" : "thevenel YTUwYWYxYjU1ZTg5NDIxMGE5NWMxN2YzOGM4MmZiN2M"
        },
        
    };
    
    request(options, function(error, response, body){
        
    var data = JSON.parse(body);
    var price = data.price;

    console.log(price);
    var currentDate = data.time;
    
    res.write("<p>The current date is" + currentDate + "</p>");
    
    res.send("<h1>The " + amount + " of " + crypto +" is currently worth " + price + " in " + fiat +" </h1>");
    });
    
});



var port = 3000;
app.listen(port, function(){
    console.log(`Server is running on port ${port}.`);
});