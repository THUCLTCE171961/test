const express = require('express')
var app = express()

var bodyParser = require('body-parser')
const AccountModel = require('./models/account')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/register', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username
    })
    .then(data=>{
            if (data) {
                res.json('du lieu nay da ton tai')
            } else {
                return AccountModel.create({
                    username: username,
                    password: password
                })
            }
        })
    .then(data=>{
            res.json('Tao tai khoan thanh cong')
        })
    .catch(err=>{
            res.status(500).json('Tao tai khoan that bai')
        })
})

app.post('/login', (req,res,next)=>{
    username=req.body.username
    password=req.body.password

    AccountModel.findOne({
        username:username,
        password:password
    })
    .then(data=>{
        if(data){
            res.json('Dang nhap thanh cong')
        }else{
            res.json('Tai khoan dang nhap khong dung')
        }
    })
    .catch(err=>{
        res.status(300).json('Co loi ben server dang nhap')
    })
})

var accountRouter = require('./routers/account')

app.use('/api/account/', accountRouter)

app.get('/', (req, res, next) => {
    res.json('HOME')
})  

app.listen(3000, () => {
    console.log(`server start on port`);
});