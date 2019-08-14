require('dotenv').config()
const line = require('@line/bot-sdk')

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

const client = new line.Client(config)

exports.handlelocation = (event) =>{
    let msg  = {
        type:'location',
        title:'บ้านของคุณ',
        address:'710/191 แก้วเงินทอง 2 คลองชักพระเขตตลิ่งชั่น กรุงเทพ',
        latitude:'13.758905',
        longitude:'100.456643'
    }

    return client.replyMessage(event.replyToken , msg)
}


// module.exports = {
//     handlelocation
// }