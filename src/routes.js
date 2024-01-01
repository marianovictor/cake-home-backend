const express = require('express');

const routes = express();


routes.get('/', (req, res)=>{
    return res.json(`Funcionando agora com pasta de rotas na porta ${process.env.PORT}`)
})


module.exports = routes;