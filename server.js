const express = require('express')
const line = require('@line/bot-sdk')
const apiNoMessage = require('./src/message-replies/no-message')
const apihandleflex = require('./src/message-replies/handleflex')
const apihandlelocation =  require('./src/message-replies/handlelocation')
const servicesFirebase = require('./src/services/firebase-services')
require('dotenv').config()

const app = express()

const config = {    
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
}

const client = new line.Client(config)



app.post('/webhook' ,  line.middleware(config) , (req,res) =>{
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
})

function handleEvent(event){

    if(event.message.type === 'sticker'){
        randomSticker(event)
    }else{
        console.log(event);
        const spilce = event.message.text.split(',')
        console.log(spilce)
        if(event.type === 'message' && spilce[0] === 'สอน'){
            trainWord(event , spilce[1] , spilce[2])
        }else 
        if(event.message.text === 'ทวิตเตอร์'){
            handletemplate(event)
        }else if(event.message.text === 'hello world'){
            handleflex(event)
        }else if(event.message.text === 'ลิสต์'){
            apihandleflex.handlelist(event)
        }else if(event.message.text === 'บ้าน'){
            apihandlelocation.handlelocation(event)
        }else{
            handleMessageEvent(event)
        }
    }
}

// random sticker 
const package1 = Array('11537')
const sticker1 = Array('52002734','52002747','52002737','52002749','52002769','52002764','52002763','52002761','52002779','52002755','52002757')

const package2 = Array('')

function randomSticker(event){

    var sticker = sticker1[Math.floor(Math.random() * sticker1.length)];

    let msg = [{
        type: 'sticker',
        packageId: package1[0],
        stickerId: sticker
        
    }]
    return client.replyMessage(event.replyToken,msg)
}

function handleMessageEvent(event){

     return servicesFirebase.queryfirebase(event.message.text).then(function (snapshot){
        let hello = snapshot.val()
        console.log(hello)
        if(hello !== null){
        let msg = [{
            type: 'text',
            text: hello[0]
        },{
            type: 'sticker',
            packageId: '11537',
            stickerId: '52002739'
            
        }]
        return client.replyMessage(event.replyToken,msg)
        }{
            apiNoMessage.noMessage(event)
        }
    })
}

function trainWord(event , ask , aws){

     servicesFirebase.Addfirebase(ask,aws)

     let msg = [{
        type: 'text',
        text: 'เรียนรู้เรียบร้อยแล้วค่ะ'
    },{
        type: 'sticker',
        packageId: '11537',
        stickerId: '52002739'
        
    }]
    return client.replyMessage(event.replyToken,msg)
}

function handletemplate(event){
    let msg = {
        type: "template",
        altText:"this is a buttons template",
        template:{
            type: "buttons",
            thumbnailImageUrl: "https://pbs.twimg.com/profile_images/1111729635610382336/_65QFl7B.png",
            imageAspectRatio:"rectangle",
            imageSize:"cover",
            imageBackgroundColor: "#FFFFFF",
            title:"Maimeearai ",
            text:"ทวิตเตอร์ของคุณ",
            defaultAction:{
                type:"uri",
                label:"View detail",
                uri:"https://twitter.com/MAIMEEARAIRA" 
            },
            actions:[
                {
                    type:"uri",
                    label:"View detail",
                    uri:"https://twitter.com/MAIMEEARAIRA"
                }
            ]
        }
    }

    return client.replyMessage(event.replyToken, msg)
}

function handleflex(event){
    let msg = {
        type:'flex',
        altText: 'this is a flex message',
        contents:{
            type: 'bubble',
            body:{
                type:'box',
                layout:'vertical',
                contents:[
                    {
                        type:'text',
                        text:'hello'
                    },
                    {
                        type:'text',
                        text:'world'
                    }
                ]
            }
        }
    }

    return client.replyMessage(event.replyToken , msg)
}



app.get('/', (req,res) => res.send('BOT Running'))

const PORT = process.env.PORT || 2222

app.listen(PORT , () => console.log(`BOT running on port ${PORT}`))