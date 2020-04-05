const Discord = require('discord.js')
const client = new Discord.Client()
const funcs = require("./functions.js")
const cookies = require("./cookies.js")


const { prefix, token } = require('./config.json')

client.login(token)
 

client.on('ready', () => {    
    console.log(`Logged in as ${client.user.tag}!`)    
})

client.on('message', async msg => {
    
    //help
    if (msg.content === `${prefix}help`) {
    // msg.channel.send(
    //     "\n\n\n** 🤖ROBY COMMANDS!**```👉roby listeners pls\n👉roby what's up\n👉roby give me some wisdom\n👉roby give me some money\n👉roby show me your lenny face```"
    // )

        const embed = new Discord.MessageEmbed()
        // Set the title of the field
        embed.setTitle('🤖  Roby ')        
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

    //listeners
    if (msg.content === `${prefix}listeners pls`) {
        await funcs.getListeners().then((result) => {            
            if (typeof result == "number")
                msg.channel.send("📡 oio.radio has " + result + " listeners")
            else
                msg.channel.send(result)
        })
    }
    
    //wisdom
    if (msg.content === `${prefix}wisdom pls`) {
        msg.channel.send("🧙‍♂️ " + cookies.getFortune())
    }

    //money
    if (msg.content === `${prefix}btc pls`) {
        await funcs.getBTC().then((result) => {           
            let str = result.toFixed(2)+"$" 
            msg.channel.send(" 1 BTC = **" + str +"**")
            // if (result > 11000)
            //     msg.channel.send("sell!")
            // else
            //     msg.channel.send("buy!")
        })
    }

    //lenny face
    if (msg.content === `${prefix}lenny face pls`) {        
        msg.channel.send("`( ° ͜ʖ °)`")
    }

    // what's up
    if (msg.content === `${prefix}what's up`) {            
        msg.channel.send("👋 " + msg.author.username + ", " + cookies.getCheers())
      }

    // ping
    if (msg.content === `ping`) {            
        msg.channel.send("🏓 pong")
    }

    // beep
    if (msg.content === `beep`) {            
        msg.channel.send("🤖 bop")
    }

    // thanks
    if (msg.content === `thanks roby`) {            
        msg.reply("you are welcome")
    }    
    if (msg.content === `thank you roby`) {            
        msg.reply("you are welcome")
    }
  })


