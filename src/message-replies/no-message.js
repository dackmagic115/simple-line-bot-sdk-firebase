require('dotenv').config()
const line = require('@line/bot-sdk')

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

const client = new line.Client(config)


function noMessage(event){
    let msg =  {  
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://www.elegantthemes.com/blog/wp-content/uploads/2016/03/500-internal-server-error-featured-image-1.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "spacing": "md",
              "contents": [
                {
                  "type": "text",
                  "text": "ไม่มีคำสั่งนี้อยู่",
                  "size": "xl",
                  "weight": "bold"
                }
              ]
            }
          }
      }
 

      return client.replyMessage(event.replyToken,msg)
  
}


module.exports = {
    noMessage
}