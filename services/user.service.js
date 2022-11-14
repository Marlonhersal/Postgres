const boom = require('@hapi/boom');

const getconnection = require('../libs/postgres')
const {models} = require('../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    const data = await models.User.findAll({
      include: ['customer']
    })
    return data;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id)
    if(!user){ throw boom.notFound("No existe")}
    return user;
  }

  async update(id, changes) {
    const user =  await this.findOne(id)
    const rta =  await user.update(changes)
    return rta
  }
  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return {id}
  }
}

module.exports = UserService;
