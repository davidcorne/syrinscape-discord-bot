'use strict'

require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client()

const TOKEN = process.env.TOKEN

bot.login(TOKEN)

bot.on('ready', function () {
  console.log(`Logged in as ${bot.user.tag}!`)
})

const join = async function (message, args) {
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

const end = async function (message, args) {
  if (message.member.voice.channel) {
    await message.member.voice.channel.leave()
  }
}

const prefix = '!'

const commands = {
  join: join,
  end: end
}

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command in commands) {
    commands[command](message, args)
  } else {
    message.reply(`unknown command: ${command}`)
  }
})
