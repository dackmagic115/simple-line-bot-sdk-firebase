require('dotenv').config()
const line = require('@line/bot-sdk')

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

const client = new line.Client(config)




module.exports = {
    
}