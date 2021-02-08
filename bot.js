const Discord = require('discord.js')
const client = new Discord.Client()
const funcs = require("./functions.js")
const cookies = require("./cookies.js")
const { GoogleSpreadsheet } = require('google-spreadsheet')

var express = require("express");
var app = express();

app.listen(3344, () => {
    console.log("Server running on port 3344");
   });

app.get("/roby", (req, res, next) => {
    res.send("<h1>ciao pierre!</h1>")
    pierre()
});

app.get("/insta", (req, res, next) => {
    res.send("<h1>🤖 on it!</h1>")
    insta()
});

// used to read google spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/
const creds = require('./secrets/roby-google-key.json') 
const doc = new GoogleSpreadsheet('1ek6o7DY5m-4yxdkA8RQJNPY2n-0T1TR7BbP1i23zirQ')

// pierre()


//ask @matlo for the config.json file
const { prefix, token } = require('./secrets/config.json')
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
        embed.addField("💰 DOT","`roby polka pls`",true) 
        embed.addField("( ° ͜ʖ °)","`roby lenny face pls`",true) 
        embed.addField("👋 Hey","`roby what's up`",true)         
        embed.addField("🏓 Ping","`ping`",true)
        embed.addField("🧙‍♂️ Random Poem","`roby poem pls`",true);         
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

    // feedback wdyt
    if (command === `${prefix}wdyt`) {
        msg.channel.send(cookies.getFeedback())
    }

    // BTC value
    if (command === `${prefix}btc pls`) {
        await funcs.getBTC().then((result) => {           
            let str = result.toFixed(2)+"$" 
            msg.channel.send(" 1 BTC = **" + str +"**")        
        })
    }

    // BTC value
    if (command === `${prefix}polka pls`) {
        await funcs.getDOT().then((result) => {           
            let str = result.toFixed(2)+"$" 
            msg.channel.send(" 1 DOT = **" + str +"**")        
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
    
    // real?
    if (command === `${prefix}are you real?`) {
        msg.channel.send("idk, are you real?")
      }

    // ping
    if (command === `ping`) {            
        msg.channel.send("🏓 pong")
    }

    // pong
    if (command === `pong`) {            
        msg.channel.send("🤖 can't compute")
        msg.channel.send("*[fatal error - roby is restarting]*")
        msg.channel.send("...")
    }

    // beep
    if (command === `beep`) {            
        msg.channel.send("🤖 bop")
    }

    // bop
    if (command === `bop`) {            
        msg.channel.send("what?")
    }

    // poem
    // lenny face
    if (command === `${prefix}poem pls`) {        
        msg.channel.send( await func.getRandomPoem() );
    }

    // thanks
    if (command === `thanks roby`) {            
        msg.reply("you are welcome")
    }    
    if (command === `thank you roby`) {            
        msg.reply("you are welcome")
    }
  })




///// FUNCTIONS

async function pierre() {
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    
    const channel = client.channels.cache.find(channel => channel.name === '🔥cool-stuff')    

    const embed = new Discord.MessageEmbed()
    // Set the title of the field
    embed.setTitle("🗞 New Pierre's Newsletter! ") 
    embed.setDescription("Your weekly digest of cool stuff") 
    
    // color of the sidebar       
    embed.setColor(0x7FFFD4)             

    let testa = "_  _"
    let corpo = "_  _"
    embed.addField("_  _", "_  _" ,false)             
    rows.map((row, i) => {
        if (row.header !== undefined && row.header !== "") {                        
            if (i !== 0) {
                corpo += "\n _  _ \n"
                embed.addField(funcs.posterize(testa), corpo ,false)             
            }
            testa = row.header            
            corpo = ""
        } else {   
            s = "[🔸 "+row.text+"]("+row.link+") \n"
            corpo += s            
        }
    })    

    embed.addField("To get Pierre's Newsletter in your inbox ", "[👉 SUBSCRIBE HERE](http://eepurl.com/gdPSM1)" ,false)     
    embed.addField("_  _", "_  _" ,false)             
    embed.addField("_Thank you Pierre!_", "_  _" ,false)             

    channel.send(embed)        
}

async function insta () {      
    await funcs.insta().then((post) => {
        const channel = client.channels.cache.find(channel => channel.name === '🤖bots')    
        channel.send("✨ I just did an instagram post, check it out")        
        channel.send("👉 "+post.url)        
        channel.send("------------------------------")                
        channel.send("_ " + post.caption + " _", {files: [post.imageUrl]})                
    })
}
