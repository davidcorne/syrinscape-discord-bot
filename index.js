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
    const dispatcher = connection.play('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')
    dispatcher.on('start', () => {
      console.log('Started playing')
    })
    dispatcher.on('finish', () => {
      console.log('Finished playing')
    })
    dispatcher.on('error', console.error)
  } else {
    message.reply('You should be in a voice channel, then send the join command')
  }
}

const end = async function (message, args) {
  if (message.member.voice.channel) {
    await message.member.voice.channel.leave()
  }
}

const setup = async function (message, args) {
  if (args.length !== 1) {
    message.reply(`Expected 1 argument to setup, got ${args.length}`)
  } else {
    console.log(`Connect to syrinscape with token: ${args[0]}`)
  }
}

const prefix = '!'

const commands = {
  join: join,
  end: end,
  setup: setup
}

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command in commands) {
    console.log(`Command ${command} called with arguments: ${args}`)
    commands[command](message, args)
  } else {
    message.reply(`unknown command: ${command}`)
  }
})
