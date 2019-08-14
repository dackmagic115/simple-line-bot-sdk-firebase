const firebase = require('firebase-admin')
const serviceAccount =require('../../hmnbot-line.json') 

firebaseinitial = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://hmnbot-5ba2e.firebaseio.com/'
})

const db = firebase.database()
const ref = db.ref('introduce')

// query
exports.queryfirebase = async(ags) =>{
    console.log(ags)
      return await ref.child(ags).once('value',function(snap){
          console.log(snap.val())
          return snap.val()
      })

        
}


exports.Addfirebase = async(ask , aws) =>{
    return await ref.child(ask).set({0:aws})
}