const boom = require('@hapi/boom');

const getconnection = require('../libs/postgres')
const {models} = require('../libs/sequelize')
const bcrypt = require('bcrypt')

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password,10)
    const newUser = await models.User.create({
      ...data,
      password:hash
    })
    delete newUser.dataValues.password
    return newUser;
  }

  async find() {
    const data = await models.User.findAll({
      include: ['customer']
    })
    return data;
  }

  async findByEmail(email) {
    const data = await models.User.findOne({
      where:{
        email
      }
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
