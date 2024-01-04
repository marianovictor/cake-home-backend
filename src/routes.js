const express = require('express');
const { createOrder } = require('./controllers/orders');
const { createUser, loginUser } = require('./controllers/users');
const { emailExists, bodyVerify, userLogged } = require('./middlewares/verify');
const { schemaUser, schemaLogin } = require('./schema');

const routes = express();


routes.get('/', (req, res)=>{
    
    return res.json(`Servidor rodando na porta ${process.env.PORT}`)
})
routes.post('/order', userLogged, createOrder);


routes.use(emailExists);

routes.post('/createUser', bodyVerify(schemaUser), createUser);
routes.post('/login', bodyVerify(schemaLogin), loginUser);


module.exports = routes;