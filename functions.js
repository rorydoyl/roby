const axios = require("axios")
//const haikus = require("./haikus.js")
const cheerio = require("cheerio")
const userInstagram = require("user-instagram")

let price = require("crypto-price")
const { GoogleSpreadsheet } = require("google-spreadsheet")
const { plausibleToken, cryptoken } = require("./secrets/config.json")

/*const randomPoemUrl = "https://tofu.wtf/poems/api/random"*/

// used to read google spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/
//const creds = require("./secrets/roby-google-key.json")
const doc = new GoogleSpreadsheet(
	"1ek6o7DY5m-4yxdkA8RQJNPY2n-0T1TR7BbP1i23zirQ"
)

const fetchData = async (site) => {
	const result = await axios.get(site)
	return cheerio.load(result.data)
}

exports.getBTC = async () => {
	let response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC`, {
		headers : {
			'X-CMC_PRO_API_KEY': cryptoken
		}
	})
	return response.data.data.BTC.quote.USD.price.toFixed(2) + "$"
}

exports.getETH = async () => {
	let response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=ETH`, {
		headers : {
			'X-CMC_PRO_API_KEY': cryptoken
		}
	})
	return response.data.data.ETH.quote.USD.price.toFixed(2) + "$"
}

exports.getDOT = async () => {
	let response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=DOT`, {
		headers : {
			'X-CMC_PRO_API_KEY': cryptoken
		}
	})
	return response.data.data.DOT.quote.USD.price.toFixed(2) + "$"
}

exports.getListeners = async () => {
	const www = "https://stream.oio.radio/"
	const $ = await fetchData(www)
	let listeners = "🔇 oio.radio is off mate!"
	$(".streamstats").each(function (index) {
		if (index === 1) listeners = parseInt($(this).text())
	})
	return listeners
}

exports.insta = async () => {
	try {
		//return haikus.getHaiku()
		let response = await axios.get('https://roby.live/api/last-ig')
		return response.data
	} catch (_) {
		return null
	}
}

exports.getRandomPoem = async () => {
try {
		const response = await axios.get(randomPoemUrl)
		return response.data.content
	} catch (_) {
		return "😢 sorry, no poem 😢"
	}
}

exports.getRandomHaiku = async () => {
	try {
		//return haikus.getHaiku()
		let response = await axios.get('https://roby.live/api/random-haiku')
		return response.data.text
	} catch (_) {
		return "😢 sorry, no haiku 😢"
	}
}

exports.getRandomCheer = async () => {
	try {
		const response = await axios.get('https://roby.live/api/random-cheer')
		return response.data.text
	} catch (_) {
		return "i'm not working very well"
	}
}

exports.getRandomFeedback = async () => {
	try {
		const response = await axios.get('https://roby.live/api/random-feedback')
		return response.data.text
	} catch (_) {
		return "i'm not working very well"
	}
}

exports.getRandomFortune = async () => {
	try {
		const response = await axios.get('https://roby.live/api/random-fortune')
		return response.data.text
	} catch (_) {
		return "i'm not working very well"
	}
}

exports.shout = (wordLetters) => {
	let num = /([0-9])/
	let alph = /([a-z])/
	let string = []
	Array.from(wordLetters).map((wordSet, i1) => {
		Array.from(wordSet).map((word, i2) => {
			if (word === " ") {
				string.push(`:small_blue_diamond:`)
			} else if (alph.test(word)) {
				string.push(`:regional_indicator_${word}:`)
			} else if (num.test(word)) {
				for (var i = 0; i < digits.length; i++) {
					if (digits[i] === word) {
						string.push(`:${numbers[i]}:`)
						break
					}
				}
			}
		})
	})
	return string.join('')
}

exports.getStats = async (domain) => {
	const URL = `https://plausible.io/api/v1/stats/aggregate?site_id=${domain}&period=day&metrics=visitors,pageviews,bounce_rate,visit_duration`
	const response = await fetch(URL, {
		headers: {
			Authorization: `Bearer ${plausibleToken}`,
		},
	})
	const data = await response.json()
	return data
}
