const express = require('express')



const app = express()

app.get('/', (req,res) => res.send('BOT Running'))

const PORT = process.env.PORT || 2222

app.listen(PORT , () => console.log(`BOT running on port ${PORT}`))