const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { getProduct, getRelated, getStyles } = require('./database/index.js')

app.use(express.static('dist'));

app.get('/products/:id', (req, res) => {
  // res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  let productId = Number(req.params.id)

  getProduct({id: productId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.get('/products/:id/related', (req,res) => {
  let productId = Number(req.params.id);

  getRelated({current_product_id: productId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.get('/products/:id/styles', (req, res) => {
  let productId = Number(req.params.id);

  getStyles({productId: productId}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
