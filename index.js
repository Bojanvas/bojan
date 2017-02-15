var express = require('express');
var bodyParser = require('body-parser');
var helper = require('sendgrid').mail;
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/assets', express.static(__dirname + "/public"));
var port = process.env.PORT || 3000;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

// routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})
app.post('/mail', function(req, res, next) {
    var person = req.body;
    from_email = new helper.Email(person.email);
    to_email = new helper.Email("bojan87vasilevski@gmail.com");
    subject = "From" + person.name + " " + person.surname;
    content = new helper.Content("text/plain", person.message);
    mail = new helper.Mail(from_email, subject, to_email, content);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    })

    res.redirect('/');
})




app.listen(port, function() {
    console.log('working');
});