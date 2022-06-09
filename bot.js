const Discord = require("discord.js")
const client = new Discord.Client()
const funcs = require("./functions.js")
//const cookies = require("./cookies.js")
//const haikuList = require("./haikus.js")
const { GoogleSpreadsheet } = require("google-spreadsheet")

var express = require("express")
var app = express()

app.listen(3344, () => {
	console.log("Server running on port 3344")
})

app.get("/roby", (req, res, next) => {
	res.send("<h1>ciao pierre!</h1>")
	pierre()
})

app.get("/insta", async (req, res, next) => {
	res.send("<h1>🤖 on it!</h1>")
	let data = await funcs.insta()
	
	let embeddedMsg = new Discord.MessageEmbed()
	embeddedMsg.setColor('#0099ff')
	embeddedMsg.setTitle('Roby\'s post')
	embeddedMsg.setURL(`https://www.instagram.com/p/${data.shortCode}`)
	embeddedMsg.setAuthor(
		'roby.oio', 
		'https://instagram.ftrn4-1.fna.fbcdn.net/v/t51.2885-19/125839989_4594565063950689_7275292153696066648_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ftrn4-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Cp1ebXukLqYAX_0xN0S&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT9D6EHzVTadb162IJkumlPf6N1A6RuhKkZ2D9eY88VYyQ&oe=62A55BAC&_nc_sid=8fd12b.png', 
		'https://www.instagram.com/roby.oio/'
	)
	embeddedMsg.setDescription(data.description)
	embeddedMsg.setImage(data.imgUrl)
		//.setTimestamp()

	client.channels.fetch('978960191934590976')
		//.then(channel => channel.send(`🤖 Hey!\nWe just posted something new on IG, check it out!\n${post.url}\n${post.imageUrl}`))
		.then(channel => channel.send(embeddedMsg))
})

// used to read google spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/
//const creds = require("./secrets/roby-google-key.json")
const doc = new GoogleSpreadsheet(
	"1ek6o7DY5m-4yxdkA8RQJNPY2n-0T1TR7BbP1i23zirQ"
)

// pierre()

//ask @matlo for the config.json file
const { prefix, token, cryptoken} = require("./secrets/config.json")

client.login(token)

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async (msg) => {
	// so it's case agnostic
	const command = msg.content.toLowerCase()

	//help
	if (command === `${prefix}help` || command ===  `${prefix}help pls`) {
		const embed = new Discord.MessageEmbed()
		// Set the title of the field
		embed.setTitle("🤖  Roby ")
		// color of the sidebar
		embed.setColor(0x0000ff)
		// Set the main content of the embed
		embed.setDescription("Full command list")
		embed.addField("📡 Radio listeners", "`roby listeners pls`", true)
		embed.addField("🧙‍♂️ Wisdom", "`roby wisdom pls`", true)
		embed.addField("🍶 Random haiku", "`roby haiku pls`", true)
		embed.addField("💰 Cryptos", "`roby btc pls` `roby eth pls` `roby dot pls` `roby luna pls`", true)
		/* embed.addField("💰 ETH", "`roby eth pls` ", true)
		embed.addField("💰 DOT", "`roby dot pls`", true)
		embed.addField("💰 LUNA", "`roby luna pls`", true) */
		embed.addField("🍬 Pokémon", "`roby pokemon pls`", true)
		embed.addField("🪙 Coin toss", "`roby coin pls`", true)
		embed.addField("🎲 Dice throw", "`roby dice pls`", true)
		/* embed.addField("( ° ͜ʖ °)", "`roby lenny face pls`", true) */
		embed.addField("👋 Hey", "`roby what's up`", true)
		embed.addField("🏓 Ping", "`ping`", true)
		/* embed.addField("🧙‍♂️ Random Poem", "`roby poem pls`", true) */

		// Send the embed to the same channel as the message
		msg.channel.send(embed)
	}

	// oio radio listeners
	if (command === `${prefix}listeners pls`) {
		await funcs.getListeners().then((result) => {
			if (typeof result == "number")
				msg.channel.send("📡 oio.radio has " + result + " listeners")
			else msg.channel.send(result)
		})
	}

	// wisdom
	if (command === `${prefix}wisdom pls`) {
		let result = await funcs.getRandomFortune()
		msg.channel.send("🧙‍♂️ " + result)
	}

	// feedback wdyt
	if (command === `${prefix}wdyt`) {
		let result = await funcs.getRandomFeedback()
		msg.channel.send(result)
	}

	// Website Stats
	if (command === `${prefix}stats pls`) {
		const domains = ["oio.studio", "oio.land", "bouncing.band"]
		domains.forEach(async (domain) => {
			await funcs.getStats(domain).then((result) => {
				//unpack
				const res = result.results
				const bounceRate = res.bounce_rate.value + "%"
				const pageViews = res.pageviews.value + " views"
				const visitDuration = res.visit_duration.value + " minutes"
				const visitors = res.visitors.value + " users"

				const embed = new Discord.MessageEmbed()
				// Set the title of the field
				embed.setTitle(`🌐  ${domain} `)
				// color of the sidebar
				embed.setColor(0x0000ff)
				// Set the main content of the embed
				embed.setDescription("In the last 24 hours")
				embed.addField(`🕺 Visitors`, visitors, false)
				embed.addField(`🏀 Bounce Rate`, bounceRate, false)
				embed.addField(`👀 Page Views`, pageViews, false)
				embed.addField(`⏱ Visit Duration`, visitDuration, false)
				// Send the embed to the same channel as the message
				msg.channel.send(embed)
			})
		})
	}

	if (command === `${prefix}btc pls`) {
		try {
			let result = await funcs.getBTC()
			//data = result.toFixed(2) + "$"
			msg.channel.send(" 1 BTC = **" + result + "**")
		} catch(e) {
			msg.channel.send('Sorry, I dont have time, now')
		}
	}

	if (command === `${prefix}eth pls`) {
		try {
			let result = await funcs.getETH()
			//data = result.toFixed(2) + "$"
			msg.channel.send(" 1 ETH = **" + result + "**")
		} catch(e) {
			msg.channel.send('Sorry, I dont have time, now')
		}
	}

	// DOT value
	if (command === `${prefix}dot pls`) {
		try {
			let result = await funcs.getDOT()
			//data = result.toFixed(2) + "$"
			msg.channel.send(" 1 DOT = **" + result + "**")
		} catch(e) {
			msg.channel.send('Sorry, I dont have time, now')
		}
	}

	// LUNA value
	if (command === `${prefix}luna pls`) {
		msg.channel.send('🪦')
	}

	// pokemon
	if (command === `${prefix}pokemon pls` || command === `${prefix}pokémon pls`) {
		if(Math.random() < .95) {
			msg.channel.send(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Math.floor(Math.random() * 898) + 1}.png`)
		} else {
			msg.channel.send('woooo, it\'s shiny!')
			msg.channel.send(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${Math.floor(Math.random() * 898) + 1}.png`)
		}
	}

	// shout
	if (command.startsWith(`${prefix}shout`)) {
		let user = msg.author.username
		let letters = command.substring(11, command.length)
		let res = await funcs.shout(letters)
		msg.channel.send(res)

		setTimeout(() => {
			msg.channel.send(`i don\'t like shouting, ` + user)
		}, 300)
	}

	// dice
	if (command === `${prefix}dice pls`) {
		let symbols = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣']
		let idx = Math.floor(Math.random() * 6)
		msg.channel.send(symbols[idx])
	}

	// coin
	if (command === `${prefix}coin pls`) {
		if(Math.random() < .5) {
			msg.channel.send('🪙 head')
		} else {
			msg.channel.send('🪙 tail')
		}
	}

	// lenny face
	if (command === `${prefix}lenny face pls`) {
		msg.channel.send("`( ° ͜ʖ °)`")
	}

	// what's up
	if (command === `${prefix}what's up` || command === `${prefix}what’s up`) {
		let result = await funcs.getRandomCheer()
		msg.channel.send("👋 " + msg.author.username + ", " + result)
	}

	// real?
	if (command === `${prefix}are you real?`) {
		msg.channel.send("idk, are you real?")
	}

	if (command === `${prefix}are you real`) {
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
		msg.channel.send("🤖 blop")
	}

	// bop
	if (command === `bop`) {
		msg.channel.send("what?")
	}

	// poem
	/* if (command === `${prefix}poem pls`) {
		msg.channel.send(await funcs.getRandomPoem())
	} */

	// haiku
	if (command === `${prefix}haiku pls`) {
		msg.channel.send(await funcs.getRandomHaiku())
	}

	if (command === `${prefix}test pls`) {
		msg.channel.send("I\'m here")
	}

	// thanks
	if (command === `thanks roby`) {
		msg.reply("you are welcome")
	}
	if (command === `thank you roby`) {
		msg.reply("you are welcome")
	}

	// pixels only police
	// if (msg.channel.name === "🔸pixels-only") {
	//     if (msg.attachments.size === 0) {

	//         // msg.channel.send(" :police_car: Only pixels allowed in this channel :police_car: ")
	//     }
	// }
})