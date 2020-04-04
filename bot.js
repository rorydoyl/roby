const Discord = require('discord.js')
const client = new Discord.Client()
const funcs = require("./functions.js")
const fortune = require("./cookies.js")

const { prefix, token } = require('./config.json')

client.login(token)

client.on('ready', () => {    
    console.log(`Logged in as ${client.user.tag}!`)    
})

client.on('message', async msg => {
    
    //help
    if (msg.content === `${prefix}help`) {
    msg.reply(
        "```👉roby listeners pls\n👉roby what's up\n👉roby give me some wisdom\n👉roby give me some money\n👉roby show me your lenny face```"
    )
    }   

    //listeners
    if (msg.content === `${prefix}listeners pls`) {
        await funcs.getListeners().then((result) => {            
            if (typeof result == "number")
                msg.reply("📡 oio.radio has " + result + " listeners")
            else
                msg.reply(result)
        })
    }
    
    //wisdom
    if (msg.content === `${prefix}give me some wisdom`) {
        msg.reply("🧙‍♂️ "+fortune.getFortune())
    }

    //money
    if (msg.content === `${prefix}give me some money`) {
        let r = (Math.random()*10).toFixed(4)
        msg.reply("there you go, **" + r + " ฿ ** 💰 ")
    }

    //lenny face
    if (msg.content === `${prefix}show me your lenny face`) {        
        msg.reply("`( ° ͜ʖ °)`")
    }

    // what's up
    if (msg.content === `${prefix}what's up`) {
        const answers = [
            'not too bad',
            'not too shabby',
            'all good',
            "i'm fine",
            'alright',
            "i’m good",
            "i’m fine",
            "pretty goo",
            "i’m well",
            "i’m ok",
            "not too bad",
            "just the same old same ol",
            "yeah, all right",
            "i’m alive",
            "very well, thank",
            "i’m hanging in there",
            "i’ve been better",
            "nothing much",
            "not a lot",
            "nothing",
            "oh, just the usual",
            "oh gosh, all kinds of stuff",
            "like you, but better",
            "i could really go for a massage",
            "much better now that you are with me",
            "not so wel",
            "so far, so good",
            "i’m pretty standard right now",
            "happy and content, thank you",
            "going great. hope this status quo persists for rest of the day",
            "well enough to chat with you if you wish to",
            "i’m better than i was, but not nearly as good as i’m going to be",
            "i think i’m doing ok. how do you think i’m doing",
            "i am blessed",
            "way better than i deserve",
            "i have a pulse, so i must be okay",
            "better than some, not as good as others",
            "i’m doing really well",
            "medium well",
            "i would be lying if i said i’m fine",
            "surviving, i guess",
            "in need of some peace and quiet",
            "horrible, now that i’ve met you",
            "imagining myself having a fabulous vacation",
            "i’m better on the inside than i look on the outsid",
            "sunshine all day long",
            "i’m not sure yet",
            "i am high-quality",
            "real terrible, thanks for asking",
            "incredibly good looking",
            "the best i can be. assuming you’re at your best too",
            "i’m still sucking air",
            "better than nothing",
            "i’m vertical and breathing",
            "different day, same existence"
        ]
        let answer = answers[Math.floor(Math.random() * answers.length)]
        msg.reply("👋 " + answer)
      }
  })


