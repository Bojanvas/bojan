require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/assets', express.static(__dirname + "/public"));
var port = process.env.PORT || 3000;


// routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})
app.post('/mail', function(req, res, next) {
    var person = req.body;
    var mailOptions = {
        to: 'bojan87vasilevski@gmail.com',
        from: person.email,
        subject: "From " + person.name + "  " + person.surname,
        text: person.email + " message is: " + person.message
    }
    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end('error');
        } else {
            console.log('message send');
            res.redirect('/')
        }

    })

})




app.listen(port, function() {
    console.log('working');
});