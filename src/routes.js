const express = require('express');
const { createOrder, listOrders, preparingOrder, listPreparingOrders } = require('./controllers/orders');
const { listProducts } = require('./controllers/products');
const { createUser, loginUser } = require('./controllers/users');
const { emailExists, bodyVerify, userLogged, orderExist } = require('./middlewares/verify');
const { schemaUser, schemaLogin } = require('./schema');

const routes = express();


routes.get('/', (req, res)=>{
    
    return res.json(`Servidor rodando na porta ${process.env.PORT}`)
})
routes.post('/order', userLogged, createOrder);
routes.get('/listOrders', listOrders);
routes.get('/listProducts', listProducts)
routes.get('/listPreparingOrders', listPreparingOrders)
routes.get('/preparingOrder', orderExist, preparingOrder);


routes.use(emailExists);

routes.post('/createUser', bodyVerify(schemaUser), createUser);
routes.post('/login', bodyVerify(schemaLogin), loginUser);


module.exports = routes;