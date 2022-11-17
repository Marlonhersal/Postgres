const boom = require('@hapi/boom');
const{models} = require('../libs/sequelize')

class OrderService {
  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder;
  }

  async createItem(data){
    const newItem = await models.OrderProduct.create(data)
    return newItem;
  } 

  async find() {
    const orders = models.Order.findAll()
    return orders;
  }
  async findOne(id) {
    const order = models.Order.findByPk(id,{
      include: [{
        association: 'customer',
        include: ['user']     
      },
      'item'
      ]
    })
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
