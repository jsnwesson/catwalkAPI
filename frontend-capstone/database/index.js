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
  relatedProducts: [Number],
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

let Product = mongoose.model('Product', productSchema);
let Style = mongoose.model('Style', styleSchema);
let Feature = mongoose.model('Feature', featureSchema);
let Skus = mongoose.model('Sku', skuSchema);

Skus.findById("60d4c0bb84e6df95fb254554", function (err, sku) {
  if (err) {
    console.log(err);
  } else {
    console.log('here\'s the skus!', sku)
  };
});

// db.productfeatures.aggregate([{$lookup: {from: 'related',localField: 'id',foreignField: 'current_product_id',as: 'related'}}, {$project: {related: {_id: 0,}}}, {$out: 'prodfeatrel'}])
