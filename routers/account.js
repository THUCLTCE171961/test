const express = require('express')
var router = express.Router();

const accountModel = require('../models/account');


//Lấy dữ liệu
router.get('/', (req, res, next)=>{
    accountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Loi server')
    })

})

//Thêm dữ liệu
router.post('/', (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password

    accountModel.findOne({
        username : username
    })
    .then(data=>{
        if(data){
            res.json('Ten tai khoan da co nguoi su dung')
        }else{
            accountModel.create({
                username : username,
                password : password
            })
        }
    })
    .then(data=>{
        res.json('Tao tai khoan thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi ben server')
    })
})

//Sửa dữ liệu
router.put('/:id', (req, res, next)=>{
    var id = req.params.id
    var newPassword = req.body.newPassword

    accountModel.findByIdAndUpdate(id,{
        password : newPassword
    })
    .then(data=>{
        res.json('Update mat khau thanh cong')
    })
    .catch(err=>{
        res.status(500).json('loi ben server')
    })
})

//Xóa dữ liệu
router.delete('/:id', (req, res, next)=>{
    var id = req.params.id

    accountModel.deleteOne({
        _id:id
    })
    .then(data=>{
        res.json(`Da xoa tai khoan ${id}`)
    })
    .catch(err=>{
        res.status(500).json('Loi ben server')
    })
})

module.exports = router