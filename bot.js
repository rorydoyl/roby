const Discord = require('discord.js')
const client = new Discord.Client()
const funcs = require("./functions.js")
const cookies = require("./cookies.js")

//ask @matlo for the config.json file
const { prefix, token } = require('./config.json')
client.login(token)

client.on('ready', () => {    
    console.log(`Logged in as ${client.user.tag}!`)    
})

client.on('message', async msg => {
    
    // so it's case agnostic
    const command = msg.content.toLowerCase()    

    //help
    if (command === `${prefix}help`) {    

        const embed = new Discord.MessageEmbed()
        // Set the title of the field
        embed.setTitle('🤖  Roby ') 
        // color of the sidebar       
        embed.setColor(0x0000ff)
        // Set the main content of the embed
        embed.setDescription('Full command list');
        embed.addField("📡 Radio Listeners","`roby listeners pls`",true) 
        embed.addField("🧙‍♂️ Wisdom","`roby wisdom pls`",true) 
        embed.addField("💰 BTC","`roby btc pls`",true) 
        embed.addField("( ° ͜ʖ °)","`roby lenny face pls`",true) 
        embed.addField("👋 Hey","`roby what's up`",true)         
        embed.addField("🏓 Ping","`ping`",true)         
        // Send the embed to the same channel as the message
        msg.channel.send(embed);
    }   

    // oio radio listeners
    if (command === `${prefix}listeners pls`) {
        await funcs.getListeners().then((result) => {            
            if (typeof result == "number")
                msg.channel.send("📡 oio.radio has " + result + " listeners")
            else
                msg.channel.send(result)
        })
    }
    
    // wisdom
    if (command === `${prefix}wisdom pls`) {
        msg.channel.send("🧙‍♂️ " + cookies.getFortune())
    }

    // BTC value
    if (command === `${prefix}btc pls`) {
        await funcs.getBTC().then((result) => {           
            let str = result.toFixed(2)+"$" 
            msg.channel.send(" 1 BTC = **" + str +"**")        
        })
    }

    // lenny face
    if (command === `${prefix}lenny face pls`) {        
        msg.channel.send("`( ° ͜ʖ °)`")
    }

    // what's up
    if (command === `${prefix}what's up` || command === `${prefix}what’s up`) {            
        msg.channel.send("👋 " + msg.author.username + ", " + cookies.getCheers())
      }

    // ping
    if (command === `ping`) {            
        msg.channel.send("🏓 pong")
    }

    // beep
    if (command === `beep`) {            
        msg.channel.send("🤖 bop")
    }

    // thanks
    if (command === `thanks roby`) {            
        msg.reply("you are welcome")
    }    
    if (command === `thank you roby`) {            
        msg.reply("you are welcome")
    }
  })


