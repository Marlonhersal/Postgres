const express = require('express');
const router = express.Router();

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new OrderService();

const { createOrderSchema, getOrderSchema, addItemSchema} = require('../schemas/order.schema')

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/', 
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next)=>{
    try {
        const body = req.body;
        const newCustomer = await service.create(body);
        res.status(201).json(newCustomer);
    }
    catch(error){
        next(error)
    }
})

router.post('/add-item', 
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next)=>{
    try {
        const body = req.body;
        const newItem = await service.createItem(body);
        res.status(201).json(newItem);
    }
    catch(error){
        next(error)
    }
})

module.exports = router;
