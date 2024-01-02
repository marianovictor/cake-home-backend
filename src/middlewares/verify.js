const knex = require('../services/connection');


const bodyVerify = (schema) => async (req, res, next) =>{
    try{
        await schema.validateAsync(req.body);

        next();
    }catch(error){
        return res.json(error.message);
    }
}

async function emailExists(req, res, next){
    const {email} = req.body;

    try{
        const emailExists = await knex("users").where({email}).first();

        if(emailExists){
            return res.status(401).json({mensagem: 'O email informado já está em uso no sistema'});
        }

        next();

    }catch(error){
        return res.json(error.message);
    }
}

module.exports = {
    bodyVerify,
    emailExists
}