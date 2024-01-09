const jwt = require("jsonwebtoken");
const knex = require('../services/connection');
const SECRET_KEY = process.env.SECRET_KEY

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
        const emailExists = await knex("users").where("email", email ).first();
        
        req.userExists = emailExists || null;
        
        next();

    }catch(error){
        return res.json(error.message);
    }
}

async function userLogged(req, res, next){
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, SECRET_KEY);

        const user = await knex("users").where("id", id).first();

        if(user.lenght < 1){
            return res.status(401).json({ mensagem: "Não autorizado." });
        }

        req.user = user;

        next();
    } catch (error) {   
        return res.json(error.message);
    }
}

async function orderExist(req, res, next){
    const {id: order_id} = req.body;

    try {
        const orderExist = await knex("cart").where("id", order_id);

        req.orderExist = orderExist || null;
            
        next();

    } catch (error) {
        return res.json(error.message);
    }
}

module.exports = {
    bodyVerify,
    emailExists,
    userLogged,
    orderExist
}