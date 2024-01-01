const express = require('express');

const app = express();

app.use(express.json())

app.get('/', (req, res)=>{
    return res.json('Funcionando')
})


app.listen(3000, ()=>{
    console.log("Servidor rodando");
})