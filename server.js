

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coc', // connect to our database
{ useUnifiedTopology: true, useNewUrlParser:true});

var Product = require('./models/Product');



app.get('/', function (req, res) {
res.send('Express is running');
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
console.log('App is running on http://localhost:' + port);
});


app.get('/api', function (req, res) {
   var version ={version :"1.0b"};
   res.send(version);
    });

    //Product apis
    app.post('/api/products', function (req, res) {
          //insert data to mongodb
          var newproduct =req.body;
          var product = new Product(newproduct);
          product.save(function(err){
              if(err)  res.status(500).json(err);
              res.json({status: "Added a product"});
                      });
     
    });

    app.get('/api/products/:id', function (req, res) {
        var id = req.param.id;
        Product.find({"_id":id},function(err, products) {
            if (err) res.status(500).json(err);
                 res.json(products);
        });
         });


         app.put('/api/products/:id', function (req, res) {
            var upadateproduct = req.body;
            var id = req.param.id;
               
             Product.findByIdAndUpdate(id,upadateproduct,function(err){
                 if(err) res.status(500).json(err);
                 res.json({status:"Updated a product"});
             });



             });   
             
             app.delete('/api/products/:id', function (req, res) {
 
                var id = req.param.id;
                   
                 Product.findByIdAndRemove(id,function(err){
                     if(err) res.status(500).json(err);
                     res.json({status:"delect a product"});
                 });
    
                 });