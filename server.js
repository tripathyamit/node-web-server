const express=require("express")
const nunjucks=require("nunjucks")
const fs=require("fs")

app=express()


nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    now=new Date().toDateString()
    log=now+' method: '+req.method+' path: '+req.path+'\n'
    fs.appendFile('server.log',log,(err)=>{
        if(err){
            console.log(err);
        }
        
    })
    console.log(log)
    // var log=

next()
})

app.use((req,res,next)=>{
    return res.render('maintainance.html')
})

app.get("/",(req,res)=>{
    res.send('<h1>Hello world hi<h1>')
});

app.get("/home",(req,res)=>{
    res.send('<h1>homepage<h1>')
});

app.get("/help",(req,res)=>{
    res.render('help.html',{
        pageHeading:'Help Page',
        todaysDate: new Date().getFullYear()
    })
});


app.get("/about",(req,res)=>{
    var x={
        errorMessage:'result not found'
    }
    res.send(x)
});

app.listen(3000);