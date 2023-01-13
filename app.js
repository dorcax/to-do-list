const express =require("express")
const path =require("path")
const mongoose =require("mongoose")
const Todo =require("./models/model.js")
const methodoverride =require("method-override")
const app =express()
mongoose.connect("mongodb://localhost:27017/to-doapp",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connection opened")
})
.catch((er)=>{
    console.log(`oh no error!!!, ${err}`)
})

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodoverride("_method"))

app.get("/",async(req,res)=>{
const listtask= await Todo.find({})
res.render("todo/home.ejs",{listtask})
})

// const task =new Todo({
//     description:"assignment"
// })
// task.save().then(p=>{
//     console.log(p)
// }).catch(e=>{
//     console.log("error")
// })
//  app.get('/new',(req,res)=>{
//     res.render("todo/home.ejs")
// })
app.post('/',(req,res)=>{
   
    console.log(req.body)
})
// app.get('/:id',async(req,res)=>{
//     const {id} =req.params
//     const showtask = await Todo.findById(id)
//     res.render("todo/show.ejs",{showtask})
// })
app.get('/:id/edit',async(req,res)=>{
    const {id} =req.params
    const edittask = await Todo.findById(id)
    res.render('todo/edittask.ejs',{edittask})
})

app.patch('/:id',async(req,res)=>{
    const{id} =req.params
    const updatetask = await Todo.findByIdAndUpdate(id,req.body,{new:true})
    res.redirect(`/${updatetask._id}`)
})
app.delete("/:id",async(req,res)=>{
    const{id} =req.params
    const deletetask =await Todo.findByIdAndDelete(id)
    res.redirect('/')
})



app.listen(4040,()=>{
    console.log("server working on 4040")
})