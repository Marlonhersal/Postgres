const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class CustomerService{
    constructor(){
    }
    async create(data){
        //const newUser = await models.User.create(data.user)
        const customer = await models.Customer.create(data,{
            include:['user']
        })
        return customer;
    }

    async find(){
        const data = await models.Customer.findAll({include: ['user']})
        return data
    }

    async findOne(id) {
        const user = await models.Customer.findByPk(id)
        if(!user){ throw boom.notFound("No existe")}
        return user;
    }

    async update(id, data){
        const customer =  await this.findOne(id)
        const rta =  await customer.update(data)
        return rta
    }
    async delete(id) {
        const customer = await this.findOne(id)
        await customer.destroy(id)
        return {id}
    }
}

module.exports = CustomerService;