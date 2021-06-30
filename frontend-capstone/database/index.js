const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fetcher', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to the database!')
});

let features = mongoose.Schema({
  feature: String,
  value: String,
})

let productSchema = mongoose.Schema({
  product_id: { type: Number, unique: true },
  name: String,
  slogan: String,
  description: Number,
  category: String,
  default_price: String,
});

let featureSchema = mongoose.Schema({
  id: Number,
  product_id: Number,
  feature: String,
  value: String,
})

let relatedProducts = mongoose.Schema({
  _id: String,
  id: Number,
  current_product_id: Number,
  related_product_id: Number,
})

let skuSchema = mongoose.Schema({
  id: Number,
  styleId: Number,
  size: String,
  quantity: Number,
})

let styleSchema = mongoose.Schema({
  style_id: Number,
  product_id: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
  default: Boolean,
  name: String,
  original_price: String,
  sale_price: String,
  skus: mongoose.Schema.Types.Mixed,
  photos: [{url: String, thumbnail_url: String}],
})

let Product = mongoose.model('productfeature', productSchema);
let Styles = mongoose.model('styleskuphoto', styleSchema, 'styleskuphoto');
let Feature = mongoose.model('Feature', featureSchema);
let Skus = mongoose.model('Sku', skuSchema);
let Related = mongoose.model('Related', relatedProducts, 'related');

let getProduct = (productId, callback) => {
  Product.find(productId, function (err, product) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, product)
    };
  });
}

let getRelated = (productId, callback) => {
  Related.find(productId, function (err, related) {
    if (err) {
      callback(err, null);
    } else {
      let array = [];
      for (var i = 0; i < related.length; i++) {
        array.push(related[i].related_product_id)
      }
      callback(null, array)
    }
  })
}

let getStyles = (productId, callback) => {
  Styles.find(productId, function (err, styles) {
    if (err) {
      callback(err, null);
    } else {
      callback(null,  styles)
    }
  })
}


module.exports.getProduct = getProduct;
module.exports.getRelated = getRelated;
module.exports.getStyles = getStyles;

// console.log(getProduct({id: 1}))
// console.log(getRelated({current_product_id: 1}))
// console.log(getStyle({productId: 1}))