const mongoose = require('mongoose');
const chat = require('./models/chat.js');

main().then(()=>{ 
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchats = [
{
    from : "Kaushalya",
    to : "Raj",
    msg : "Hello BRO!!!",
    createdAt : new Date()
},
{
    from: "Raj",
    to: "Kaushalya",
    msg: "Hey, what's up?",
    createdAt: new Date()
},

{
    from: "Kaushalya",
    to: "Raj",
    msg: "Not much, just chilling. How about you?",
    createdAt: new Date()
},
{
    from: "Raj",
    to: "Kaushalya",
    msg: "Same here, just relaxing. Want to catch up later?",
    createdAt: new Date()
},
{
    from: "Kaushalya",
    to: "Raj",
    msg: "Sure, let's meet up in the evening.",
    createdAt: new Date()
},
{
    from: "Raj",
    to: "Kaushalya",
    msg: "Sounds good! See you then.",
    createdAt: new Date()
}];

chat.insertMany(allchats);