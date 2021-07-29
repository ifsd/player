const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  spotifyId: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  displayName: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})

module.exports = User
