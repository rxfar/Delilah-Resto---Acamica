const sequelize = require('sequelize');
const DataBase = require('./connection');
const jwt = require('jsonwebtoken');
const { callbackify } = require('util');
const firm = 'delilah';

module.exports ={

    signUp: (req, res) =>{
        DataBase.query(
            'INSERT INTO customers (user, pass, name, lastname, email, phone, adress) VALUES (:user, :pass, :name, :lastname, :email, :phone, :adress)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('User successfully created!'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },

    logIn: async (req,res) =>{
        const reqUser = req.body.user
        const reqPass = req.body.pass
        const password = await DataBase.query(`SELECT id, pass FROM customers WHERE user = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const isAdmin = await DataBase.query(`SELECT id, is_admin FROM customers WHERE user = "${reqUser}"`, { type: sequelize.QueryTypes.SELECT })
        const passOk = password[0].pass
        const adminOk = isAdmin.find(item => item.is_admin === 1)
       
        if(passOk == reqPass){
            if(adminOk == undefined){
                const user = password[0]
                const token = jwt.sign({
                    user
                }, firm)
                res.json({token})
            }else { 
                const user = isAdmin[0]
                const token = jwt.sign({
                    user,
                    isAdmin
                }, firm)
                res.json({token})
            }

        }else { 
            res.json('invalid user/password')
        }
    
    },

    getCustomers: (req,res)=>{
        DataBase.query('SELECT * FROM customers', { type: sequelize.QueryTypes.SELECT }).then(result =>res.status(200).json(result))
    },

    deleteCustomer: (req, res) => { 
        const id = req.params.id   
            DataBase.query(`DELETE FROM customers WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("User successfully deleted"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))  
    },

    createProduct: (req, res) =>{
        DataBase.query(
            'INSERT INTO products (product, description, price, disponibility, image_id) VALUES (:product, :description, :price, :disponibility, :image_id)',{
                replacements: req.body
            }).then(result => console.log(result) || res.status(200).json('Product successfully added'))
              .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    },
    
    getAllProducts: (req,res) => {
        DataBase.query('SELECT * FROM products', { type: sequelize.QueryTypes.SELECT })
        .then(result =>res.status(200).json(result))
        .catch(error => console.log(error) || res.status(400).json('Invalid data'))
    },

    updateProduct: (req,res) => {
        const id = req.params.id
        const newPrice = req.body.price
        const disponibility = req.body.disponibility
            if(req.body.price){
                if(req.body.disponibility == 0||1){
                    DataBase.query(`UPDATE products SET price = ${newPrice}, disponibility = ${disponibility} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                    .then(result => console.log(result) || res.status(200).json("Product updated"))
                    .catch(error => console.log(error) || res.status(400).send('Invalid data'))
                } else {
                   DataBase.query(`UPDATE products SET price = ${newPrice} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                   .then(result => console.log(result) || res.status(200).json("Product updated"))
                   .catch(error => console.log(error) || res.status(400).send('Invalid data'))
                }
            } else {
                if(req.body.disponibility == 0||1 ){
                  DataBase.query(`UPDATE products SET disponibility = ${disponibility} WHERE id = ${id}`,{type: sequelize.QueryTypes.SET})
                  .then(result => (console.log(result)) || res.status(200).json("Product updated"))
                  .catch(error => console.log(error) || res.status(400).send('Invalid data'))                
                }
            }
    },

    deleteProduct: (req, res) => {
        const id = req.params.id   
            DataBase.query(`DELETE FROM products WHERE id = ${id}`,{type: sequelize.QueryTypes.DELETE})
            .then(result => (console.log(result)) || res.status(200).json("Product successfully deleted"))
            .catch(error => console.log(error) || res.status(400).send('Invalid data'))               
    },


    postOrder: async (req, res) =>{
        try{
            const userId = req.user.user.id
            const idPago = req.body.payment_id
            const items = req.body.items
            const orderOK = await DataBase.query(`SELECT MAX(id)+1 FROM orders`, { type: sequelize.QueryTypes.SELECT })
            const orderId = Object.values(orderOK[0].valueOf('MAX(id)+1 FROM orders'))

            function setOrder(){
                try{
                    items.forEach(item => {
                        DataBase.query(`INSERT INTO orders_detail (quant, product_id, order_id, unity_price, total_prod_price) VALUES (${item.quant},${item.product_id},${orderId}, (SELECT price FROM products WHERE id = "${item.product_id}"), (quant*unity_price))`)
                    });
                } catch (err) {
                    console.error('Error'); }
            }

            async function posting(){
                try{
                    await setOrder();
                    DataBase.query(`INSERT INTO orders (id, payment_id, customer_id, total) VALUES (${orderId},${idPago},${userId}, (SELECT SUM(total_prod_price) FROM orders_detail WHERE order_id = "${orderId}"))`)
                }
                catch (err) {
                    console.error('Error posting');}
                
            }
            posting()

            res.status(200).json(`Order successfully created!`);
        }
        catch (err) {
            console.log(err);
            res.status(400).json('Invalid data');
            next(err);
        }
    },

    getAllOrders: async (req,res) =>{
        const allOrders = await DataBase.query(`SELECT customer_id, order_id, status, date, product_id, quant, unity_price, total_prod_price, total, payment_id FROM orders_detail LEFT JOIN orders ON orders.id = orders_detail.order_id`, { type: sequelize.QueryTypes.SELECT })
        if(allOrders == ""){
                return res.status(400).json('No orders here!');
            }else { 
            res.status(200).json(allOrders)
            }
    },  

    updateOrder: (req,res) => {
        const id = req.params.id
        const status = req.body.status
        DataBase.query(`UPDATE orders SET status = '${status}' WHERE order_id = ${id} `,{type: sequelize.QueryTypes.SET})
        .then(result => (console.log(result)) || res.status(200).json('State successfully updated'))
        .catch(error => console.log(error) || res.status(400).send('Invalid status'))
    },

    getOrder: async (req,res) => {
        const orderid = req.params.id
        const userId = req.user.user.id
        const db = await DataBase.query(`SELECT status, date, payment_id, total FROM orders WHERE customer_id = ${userId} AND id = ${orderid}`, { type: sequelize.QueryTypes.SELECT })
        if(db == ""){
            return res.status(400).json('You have not placed any order');
        }else { 
        res.status(200).json(db)
        }
    },

    deleteOrder: async (req,res) => {
        const id = req.params.id
        const customer_id = req.body.customer_id
        DataBase.query(`DELETE FROM orders WHERE order_id = ${id}`,{type: sequelize.QueryTypes.DELETE})
        DataBase.query(`DELETE FROM wishes WHERE customer_id = ${customer_id}`,{type: sequelize.QueryTypes.DELETE})
        .then(result => (console.log(result)) || res.status(200).json("Order successfully deleted"))
        .catch(error => console.log(error) || res.status(400).send('Invalid data'))
    }
}