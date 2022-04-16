const Product = require('../models/product')
const express = require('express')
const productRouter = express.Router()
const productSeedData = require('../models/productSeed')

module.exports = productRouter