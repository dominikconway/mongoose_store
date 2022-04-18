const Product = require('../models/product')
const express = require('express')
const productRouter = express.Router()
const productSeed = require('../models/productSeed')

//middleware
const bodyParser = require('body-parser')
productRouter.use(bodyParser.urlencoded({ extended: false}))

// induces (index, new, delete, update, create, edit, show)

// seeds data
productRouter.get("/seed", (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {
        Product.create(productSeed, (error, data) => {
            res.redirect("/products")
          })
        })
    })
// index route
productRouter.get('/', (req, res) => {
    //[]grabs everything
    Product.find({}, (err, allProducts) => {
        console.log(allProducts)
        res.render('index.ejs', {products: allProducts})
    })
})

// new route
productRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})


// create route
productRouter.post('/', (req, res) => {
    //res.send(req.body) //sends the body of the form to the page
    Product.create(req.body, (err, createdProduct) => {
        if (err) {
            console.log(err)
        } else {
        res.redirect('/products')
        }
    })
})
    

productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        if(err){
            console.log(err)
        }
        res.render('show.ejs', {product: foundProduct})

    })
})



module.exports = productRouter