var express=require('express')
var bodyParser=require('body-parser')
var dbConfig=require('./config/database')
var mongoose=require('mongoose')

var app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log('DB connected')
}).catch(err=>{
    console.log('Error while DB connection '+err)
    process.exit()
})

var port = process.env.PORT || 3000;


require('./app/routes/user.routes')(app)

app.listen(port,()=>{
    console.log('Server is live dawg at 3000')
})
