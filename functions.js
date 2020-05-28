const axios = require("axios")
const cheerio = require("cheerio")
const siteUrl = "https://stream.oio.radio/"
let price = require('crypto-price')

const randomPoemUrl = "https://tofu.wtf/poems/api/random";

const fetchData = async () => {
    const result = await axios.get(siteUrl)
    return cheerio.load(result.data)
}

exports.getBTC = async () => {
    const btc = await price.getCryptoPrice("USD", "BTC").then(obj => {         
        return parseFloat(obj.price)        
    }).catch(err => {
        console.log(err)
    })      
    return btc
}

exports.getListeners = async () => {
    const $ = await fetchData()
    let listeners = "🔇 oio.radio is off mate!"
    siteName = $('.streamstats').each(function( index ) {
        if (index === 1)
            listeners = parseInt($( this ).text())
      })
    return listeners
}

exports.getRandomPoem = async () => {
    try {
        const response = await axios.get( randomPoemUrl );
        return response.data.content;
    }
    catch (_) {
        return "😢 sorry, no poem 😢"
    }
}


