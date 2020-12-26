const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
require('dotenv').config();

const productRouter = require('./routers/Product.route');

const app = express();

app.set('view engine', 'hbs');
app.set('views', './views');
hbs.registerPartials(__dirname + '/views/components');
hbs.registerHelper('add', function (index) {
    index++;
    return index;
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', productRouter);

const PORT = 8000 || process.env.PORT;

app.listen(PORT);

console.log(`Server running at port ${PORT}`);