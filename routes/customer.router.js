const express = require('express');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schemas');

const service = new CustomerService();
const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const customers = await service.find()
        res.json(customers)
    }
    catch(error){
        next(error)
    }
})

router.get('/:id',
    validatorHandler(getCustomerSchema, 'params')
    ,async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    }
    catch(error){
        next(error)
    }
})

router.post('/', 
    validatorHandler(createCustomerSchema, 'body'),
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

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

