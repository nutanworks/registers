var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("error in connecting to database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) =>{
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phno = req.body.phno
    var gender =req.body.gender
    var regno =req.body.regno

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "regno":regno
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
}).listen(3000);

console.log("Listening on port 3000")