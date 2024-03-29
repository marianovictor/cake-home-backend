const joi = require('joi');

const schemaUser = joi.object({
    name: joi.string().min(3).required().messages({ 
        'any.required': 'O campo nome é obrigatório',
        'string.min': 'O campo nome precisa ter no mínimo 3 letras'
    }),

    email: joi.string().email().required().messages({ 
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido'
    }),
    phone: joi.string().min(10).max(11).required().messages({ 
        'any.required': 'O campo telefone é obrigatório',
        'string.base': 'O campo telefone precisa ter um formato válido',
        'string.min': 'O campo telefone precisa ter no mínimo 10 caracteres',
        'string.max': 'O campo telefone precisa ter no máximo 11 caracteres'
        
    }),
    password: joi.string().min(5).required().messages({ 
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'O campo senha precisa ter no mínimo 5 caracteres'
    }),
})

const schemaLogin = joi.object({
    email: joi.string().email().required().messages({ 
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email precisa ter um formato válido'
    }),
    password: joi.string().min(5).required().messages({ 
        'any.required': 'O campo senha é obrigatório',
        'string.min': 'O campo senha precisa ter no mínimo 5 caracteres'
    }),
})
module.exports = {
    schemaUser, 
    schemaLogin
}