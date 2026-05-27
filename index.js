const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const chat = require('./models/chat.js');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

main().then(()=>{ 
    console.log("Connected to MongoDB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get('/chats',async (req,res)=>{
  let chats = await chat.find(); 
  //console.log(chats);
    res.render("index", { chats });
});

//new chat route
app.get('/chats/new',(req,res)=>{
 res.render("new.ejs");
});

//create chat route
app.post('/chats',async (req,res)=>{
    let {from,to,msg} = req.body;
    let newChat = new chat({
        from:from,
       to: to,
       msg: msg,
    createdAt: new Date()
 })
 newChat.save().then((res)=>{
    console.log("Chat was saved ");
 }).catch((err)=>{
    console.log(err);
 });
    res.redirect('/chats');
});

//edit chat route
app.get('/chats/:id/edit', (req,res)=>{
    let {id} = req.params;
    let chatToEdit = chat.findById(id).then((chat)=>{
        console.log(chat);
        res.render("edit.ejs", { chat });
    }).catch((err)=>{
        console.log(err);
    });
});

//update chat route
app.put('/chats/:id',async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await chat.findByIdAndUpdate(id, { msg: newMsg },{runValidators:true, new:true});
    res.redirect('/chats');
});

//delete chat route
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params;
   let deletedChat = await chat.findByIdAndDelete(id);
    res.redirect('/chats');
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});