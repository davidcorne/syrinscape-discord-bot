'use strict'

require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()

const TOKEN = process.env.TOKEN

bot.login(TOKEN)

bot.on('ready', function () {
  console.log(`Logged in as ${bot.user.tag}!`)
})

const join = async function (message) {
  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join()
    const dispatcher = connection.play('SoundHelix-Song-1.mp3')
    dispatcher.on('start', () => {
      console.log('Started playing')
    })
    dispatcher.on('finish', () => {
      console.log('Finished playing')
    })
    dispatcher.on('error', console.error)
  }
}

const commands = {
  '!join': join
}

bot.on('message', async message => {
  for (const command in commands) {
    if (message.content.startsWith(command)) {
      console.debug(`Command ${command} parsed`)
      commands[command](message)
    }
  }
})
