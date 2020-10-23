const axios = require("axios")
const cheerio = require("cheerio")
const siteUrl = "https://stream.oio.radio/"
let price = require('crypto-price')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const randomPoemUrl = "https://tofu.wtf/poems/api/random";

// used to read google spreadsheet
// https://theoephraim.github.io/node-google-spreadsheet/
const creds = require('./secrets/roby-google-key.json') 
const doc = new GoogleSpreadsheet('1ek6o7DY5m-4yxdkA8RQJNPY2n-0T1TR7BbP1i23zirQ')

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

exports.posterize = (wordLetters) => { 
    let num = /([0-9])/;
    let alph = /([a-z])/;
    let string = [];
    Array.from(wordLetters).map((wordSet, i1) => {
      Array.from(wordSet).map((word, i2) => {
        if (word === ' ') {
          string.push(`:small_blue_diamond:`);
        } else if (alph.test(word)) {
          string.push(`:regional_indicator_${word}:`);
        } else if (num.test(word)) {
          for (var i = 0; i < digits.length; i++) {
            if (digits[i] === word) {
              string.push(`:${numbers[i]}:`);
              break;
            }
          }
        }
      });
    });    
    return (string.join(""))
}

