const Product = require('../models/product')
const express = require('express')
const productRouter = express.Router()
const productSeed = require('../models/productSeed')

//middleware
const bodyParser = require('body-parser')
productRouter.use(bodyParser.urlencoded({ extended: false}))
const methodOverride = require('method-override')
productRouter.use(methodOverride('_method'))

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
        //console.log(allProducts)
        res.render('index.ejs', {products: allProducts})
    })
})

// new route
productRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})

// delete route
productRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        res.redirect('/products')
    })
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
    
// show route
productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => { console.log(foundProduct)
        if(err){
            console.log(err)
        }
        res.render('show.ejs', {product: foundProduct})

    })
})

productRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        res.render('edit.ejs', {product})
    })
})

// add buy button
productRouter.delete('/:id/buy',(req, res) => {
    Product.findById(req.params.id, (err, product) => {

    })
})

productRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, updatedProduct) => {
        res.redirect(`/products/${req.params.id}`)
    })
})


module.exports = productRouter