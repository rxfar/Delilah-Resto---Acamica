const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const {productValidation, userValidation, onlyAdmin, userOK, orderId} = require('./middlewares');
const {signUp,  logIn, getClients, deleteClient, createProduct, deleteProduct, updateProduct, getAllProducts, addItemToOrder, deleteItemOfOrderList, postOrder, getAllOrders, updateOrder, getOrder, deleteOrder} = require('./functions');

/* 
app.get('/', function(req, res) {
    res.send('Welcome to Delilah Resto!');
  });
*/

// Customers
app.post('/customers', signUp);
app.post('/customers/login', userValidation, logIn);
app.get('/customers', onlyAdmin, getClients);
app.delete('/customers/:id', onlyAdmin, deleteClient);

// Products
app.get('/products', getAllProducts);
app.post('/products', onlyAdmin, createProduct);
app.put('/products/:id',productValidation, onlyAdmin, updateProduct);
app.delete('/products/:id', productValidation, onlyAdmin, deleteProduct);

// Orders
app.post('/wishes', userOK, addItemToOrder);
app.delete('/wishes', userOK, deleteItemOfOrderList);
app.post('/orders', userOK, postOrder);
app.get('/orders/:id', userOK, getOrder);
app.get('/orders', onlyAdmin, getAllOrders);
app.put('/orders/:id', onlyAdmin, updateOrder);
app.delete('/orders/:id', orderId, onlyAdmin, deleteOrder);