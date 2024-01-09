const knex = require('../services/connection');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY

async function createUser(req, res) {
    const { name, email, password } = req.body;
    const userExists = req.userExists;
    
    try {
        if (userExists) {
            return res.status(401).json({ mensagem: 'O email informado já está em uso no sistema' });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await knex('users').insert({ name, email, password: encryptedPassword }).returning(["name", "email"]);
        return res.status(200).json(user);

    } catch (error) {
        return res.json(error.message);
    }
}

async function loginUser(req, res) {
    const { password } = req.body;
    const userExists = req.userExists;

    try {

        if (!userExists) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
        }

        const userPassword = await bcrypt.compare(password, userExists.password);

        if (!userPassword) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
        }
        const userId = { id: userExists.id };

        const userToken = jwt.sign(userId, SECRET_KEY, { expiresIn: '8h' })

        return res.status(201).json({
            mensagem: 'Usuário logado!',
            usuario: userExists.name,
            id: userExists.id,
            token: userToken
        });
    } catch (error) {
        return res.json(error.message);
    }
}

async function listOrdersUser(req, res){
    const user =  req.user;
    try {
        
        const orders = await knex('cart').where("user_name", user.name);
        return res.status(200).json(orders);
    } catch (error) {
        return res.json(error.message);
    }
}

module.exports = {
    createUser,
    loginUser,
    listOrdersUser
}