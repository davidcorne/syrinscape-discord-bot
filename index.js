'use strict'

require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()

const TOKEN = process.env.TOKEN

bot.login(TOKEN)

bot.on('ready', function () {
  console.log(`Logged in as ${bot.user.tag}!`)
})
