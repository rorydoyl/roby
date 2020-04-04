const Discord = require('discord.js')
const client = new Discord.Client()
const funcs = require("./functions.js")

const { prefix, token } = require('./config.json')



client.on('ready', () => {    
    console.log(`Logged in as ${client.user.tag}!`)    
})

client.login(token)

client.on('message', async msg => {
    if (msg.content === `${prefix}listeners pls`) {
        await funcs.getListeners().then((result) => msg.reply("oio.radio has " + result + " listeners"))        
    }
    if (msg.content === `${prefix}beep`) {
        msg.reply('bop')
      }
  })