module.exports.validateCreate = function(req, res, next) {
    var name = req.body.product_name;
    var price = req.body.product_price;
    var color = req.body.product_color;
    var des = req.body.product_des;

    var validate = [];

    if(name === "") {
        validate.push({
            text: 'Product Name is required!',
            class: 'alert alert-danger'
        });
    }

    if(price <= 0 || price == "") {
        validate.push({
            text: 'The product price is required and must not be less than or equal to 0!',
            class: 'alert alert-danger'
        });
    }

    if(color === "") {
        validate.push({
            text: 'Product Color is required!',
            class: 'alert alert-danger'
        });
    }

    if(des === "") {
        validate.push({
            text: 'Product information is required and must be no less than 10 characters long!',
            class: 'alert alert-danger'
        });
    }

    if(validate.length > 0) {
        res.render('product/create', {message: validate});

        return;
    }

    next();
}

module.exports.validateEdit = async function(req, res, next) {
    var name = req.body.product_name;
    var price = req.body.product_price;
    var color = req.body.product_color;
    var des = req.body.product_des;

    var validate = [];

    if(name === "") {
        validate.push({
            text: 'Product Name is required!',
            class: 'alert alert-danger'
        });
    }

    if(price <= 0 || price == "") {
        validate.push({
            text: 'The product price is required and must not be less than or equal to 0!',
            class: 'alert alert-danger'
        });
    }

    if(color === "") {
        validate.push({
            text: 'Product Color is required!',
            class: 'alert alert-danger'
        });
    }

    if(des === "") {
        validate.push({
            text: 'Product information is required and must be no less than 10 characters long!',
            class: 'alert alert-danger'
        });
    }

    if(validate.length > 0) {
        const mongodb = require('mongodb');
        const MongoClient = mongodb.MongoClient;
        const URI = process.env.URI;
        const DB = process.env.DATABASE;
        const ObjectId = mongodb.ObjectId;

        var query = req.body.id;

        var idEdit = {
            _id: ObjectId(query)
        };
    
        var client = await MongoClient.connect(URI, { useUnifiedTopology: true });
        var dbo = client.db(DB);
    
        var result = await dbo.collection("Products").findOne(idEdit, {});

        res.render('product/edit', {data: result, message: validate});

        return;
    }

    next();
}