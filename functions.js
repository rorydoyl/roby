const axios = require("axios")
const cheerio = require("cheerio")
const siteUrl = "https://stream.oio.radio/"

const fetchData = async () => {
    const result = await axios.get(siteUrl)
    return cheerio.load(result.data)
}

exports.getListeners = async () => {
    const $ = await fetchData()
    let listeners = 0
    siteName = $('.streamstats').each(function( index ) {
        if (index === 1)
            listeners = $( this ).text()
      })
    return listeners
}