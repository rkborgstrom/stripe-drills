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
    res.render('/paysuccess');
})

app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;
