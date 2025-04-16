var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://repo:admin123@mynewclust.zhsukez.mongodb.net/?retryWrites=true&w=majority&appName=mynewclust')
var db=mongoose.connection
db.on('error',()=> console.log("error in connecting to database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) =>{
    var name = req.body.name
    var branch = req.body.branch
    var semester = req.body.semester
    var regno = req.body.regno
    var email =req.body.email
    var feedback =req.body.feedback

    var data={
        "name":name,
        "branch":branch,
        "semester":semester,
        "regno":regno,
        "email":email,
        "feedback":feedback
    }
    db.collection('users').insertOne(data,(err,colection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.redirect('signup_succesful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3070);

console.log("Listening on port 3070")