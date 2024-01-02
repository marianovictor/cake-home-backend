const knex = require('../services/connection');
const bcrypt = require('bcrypt');

async function createUser(req, res){
    const {name, email, password} = req.body;

    try{
       
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user =  await knex('users').insert({name, email, password: encryptedPassword}).returning(["name", "email"]);
        return res.status(200).json(user);
    }catch(error){
        return res.json(error.message);
    }
}


module.exports = {
    createUser
}