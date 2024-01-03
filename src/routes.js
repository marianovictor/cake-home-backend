const express = require('express');
const { createUser, loginUser } = require('./controllers/users');
const { emailExists, bodyVerify } = require('./middlewares/verify');
const { schemaUser, schemaLogin } = require('./schema');

const routes = express();


routes.get('/', (req, res)=>{
    return res.json(`Funcionando agora com pasta de rotas na porta ${process.env.PORT}`)
})



routes.use(emailExists);

routes.post('/createUser', bodyVerify(schemaUser), createUser);
routes.post('/login', bodyVerify(schemaLogin), loginUser);


module.exports = routes;