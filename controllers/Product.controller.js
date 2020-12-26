const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const URI = process.env.URI;
const DB = process.env.DATABASE;
const ObjectId = mongodb.ObjectId;

exports.getCreate = (req, res) => {
    res.render('product/create');
}

exports.create = async(req, res) => {
    var name = req.body.product_name;
    var price = req.body.product_price;
    var color = req.body.product_color;
    var des = req.body.product_des;

    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    var newProduct = {
        product_name: name,
        product_price: price,
        product_color: color,
        product_des: des
    };

    await dbo.collection("Products").insertOne(newProduct);

    res.redirect('/');
}

exports.getEdit = async(req, res) => {
    var query = req.query.id;

    var idEdit = {
        _id: ObjectId(query)
    };

    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    var result = await dbo.collection("Products").findOne(idEdit, {});

    res.render('product/edit', {data: result});
}

exports.edit = async(req, res) => {
    var query = req.body.id;
    var name = req.body.product_name;
    var price = req.body.product_price;
    var color = req.body.product_color;
    var des = req.body.product_des;

    var idEdit = {
        _id: ObjectId(query)
    };

    var editProduct = {
        $set: {
            product_name: name,
            product_price: price,
            product_color: color,
            product_des: des,
        }
    }

    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    await dbo.collection("Products").updateOne(idEdit, editProduct);

    res.redirect('/');
}

exports.delete = async(req, res) => {
    var query = req.query.id;

    var idDelete = {
        _id: ObjectId(query)
    };

    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    await dbo.collection("Products").deleteOne(idDelete);

    res.redirect('/');
}

exports.getAll = async(req, res) => {
    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    var result = await dbo.collection("Products").find({}).toArray();

    res.render('product/index', {data: result});
}

exports.search = async(req, res) => {
    var query = req.body.product_name;

    var client = await MongoClient.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    var dbo = client.db(DB);

    var result = await dbo.collection("Products").find({product_name: new RegExp(query, 'i')}).toArray();

    var countResult = result.length;

    res.render('product/index', {data: result, count: countResult});
}
