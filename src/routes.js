const express = require('express');
const { createUser } = require('./controllers/users');
const { bodyCreateUser, emailExists, bodyVerify } = require('./middlewares/verify');
const { schemaUser } = require('./schema');

const routes = express();


routes.get('/', (req, res)=>{
    return res.json(`Funcionando agora com pasta de rotas na porta ${process.env.PORT}`)
})

routes.use(bodyVerify(schemaUser), emailExists);
routes.post('/createUser', createUser);


module.exports = routes;