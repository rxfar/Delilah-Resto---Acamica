const sequelize = require('sequelize');
const DataBase = require('./connection');
const jwt = require('jsonwebtoken')
const firm = 'delilah' 

module.exports = {

    productValidation: async (req, res, next) => {
            const db = await DataBase.query(`SELECT * FROM products WHERE id = "${req.params.id}"`, {type: sequelize.QueryTypes.SELECT})
            const dbFind = db.find(item => item.id == req.params.id)
            if(!dbFind){
                return res.status(400).json('Wrong Id');
            } 
            next() 
    },

    userValidation: async (req, res, next) => {
        const db = await DataBase.query(`SELECT * FROM customers WHERE user = "${req.body.user}"`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.user == req.body.user)
        if(!dbFind){
            return res.status(400).json('invalid user/password');
        } 
        next() 
    },

    onlyAdmin: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firm)
            if(verifyToken){
                req.user = verifyToken;
                if(req.user.user.is_admin == 1){
                    return next()
                } else{ 
                    res.json({error: 'Only admin'})
                }

            }
        } catch (err){
            res.json({error: 'Invalid user'})
        }

    },

    userOK: (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            const verifyToken = jwt.verify(token, firm)
            if(verifyToken){
                req.user = verifyToken;
                return next()
            }
        } catch (err){
            res.json({error: 'Invalid user'})
        }
    },
    orderId: async (req, res, next) => {
        const db = await DataBase.query(`SELECT * FROM orders WHERE order_id = ${req.params.id}`, {type: sequelize.QueryTypes.SELECT})
        const dbFind = db.find(item => item.order_id == req.params.id)
        if(!dbFind){
            return res.status(400).json('Invalid id');
        } 
        next() 
    }
}
       
