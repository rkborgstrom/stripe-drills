const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(morgan('short'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.render('/index');
})

app.get('/paysuccess', (req, res, next) => {
    res.render('/paysuccess');
})

app.get('/charge', (req, res, next) => {
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: 'gbp',
        source: token
    }, function(err, charge){
        if(err & err.type === "StripeCardError"){
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
