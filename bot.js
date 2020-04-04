const axios = require("axios");
const cheerio = require("cheerio");
const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');

const siteUrl = "https://stream.oio.radio/";

const fetchData = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
};

const getListeners = async () => {
    const $ = await fetchData()
    let listeners = 0
    siteName = $('.streamstats').each(function( index ) {
        if (index === 1)
            listeners = $( this ).text()
      });
    return listeners
}

client.on('ready', () => {    
    console.log(`Logged in as ${client.user.tag}!`)    
})

client.login(token)

client.on('message', async msg => {
    if (msg.content === `${prefix}listeners pls`) {
        await getListeners().then((result) => msg.reply("🤖 _oio.radio has " + result + " listeners._"))        
    }
    if (msg.content === `${prefix}beep`) {
        msg.reply('bop')
      }
  })