const bodyParser = require('body-parser');
const express = require('express');
const strip = require('stripe')('sk_test_oJUwEkm3gJOlqs0d4XKB2HnD');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function (req, res) {
    res.render('index', {

    });
});

app.get('/paysuccess', (req, res, next) => {
    res.render('/paysuccess');
})

app.post('/charge', (req, res, next) => {
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: 'usd',
        source: token
    }, function (err, charge) {
        if (err & err.type === "StripeCardError") {
            console.log("Your card was declined");
        }
    });
    console.log("Your payment was successful")
    res.redirect('/paysuccess')
});

app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;