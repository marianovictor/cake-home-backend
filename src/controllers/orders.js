const knex = require("../services/connection");

async function createOrder(req, res) {
    const { order } = req.body;
    const { id: user_id } = req.user

    try {

        const productsInStock = await knex("products");

        let wrongProducts = [];
        let orderedProducts = [];
        let orderedProductsQuantities = [];
        let totalPrice = 0;


        for (const product of order) {
            const productExist = productsInStock.find((productInStock) => {
                if (productInStock.id === product.id) {
                    totalPrice += productInStock.price * product.quantidade;
                    return true
                }
            })

            if (!productExist) {
                wrongProducts.push({ message: `O produto com o id ${product.id} não existe` });
            }
            if (productExist) {
                const descripionProduct = await knex("products").where("id", product.id).returning(['desciption']).first();
                orderedProducts.push(descripionProduct.description);
                orderedProductsQuantities.push(product.quantidade)
            }
        }

        const user = await knex('users').select("name", "phone").where("id", user_id).first();

        const ordered = await knex('cart').insert({ user_name: user.name, products_description: orderedProducts, total_price: totalPrice, quantities: orderedProductsQuantities }).returning(["products_description", "quantities", "total_price"]);

        

        let wppMessageOrder = ""
        let count = 0;
        for(products  of orderedProducts){
            wppMessageOrder += `${products}(${orderedProductsQuantities[count]}), `
            count++
        }
        console.log(wppMessageOrder);
        
        client.on('qr', (qr) => {
            // Generate and scan this code with your phone
            qrcode.generate(qr, {small: true})
        });

        client.on('ready', () => {
            console.log('Client is ready!');
           
             // Number where you want to send the message.
            const number = `+55${user.phone}`;
            //console.log(number);
             // Your message.
            const text = `Oi *${user.name}*. esse é um teste para envio de pedio no wpp, e testar se o negocio nao descoisa. *Seu pedido foi: ${wppMessageOrder}*`;
           
             // Getting chatId from the number.
             // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
            const chatId = number.substring(1) + "@c.us";
           
            // Sending message.
            client.isRegisteredUser(chatId).then(function(isRegistered){
                if(isRegistered){
                    client.sendMessage(chatId, text);
                }else{
                    console.log(number+' Não Registrado');
                }
    
            })
            
        });

        client.initialize();

        return res.json({
            cliente: user,
            carrinho: ordered,
            erros: wrongProducts
        })
    } catch (error) {
        return res.json(error.message);
    }
}

async function listOrders(req, res) {

    try {

        const orders = await knex('cart')
            .select('user_name as nome', 'products_description as pedido', 'quantities as quantidades', 'total_price as valor_total', 'id as id_pedido')



        return res.json(orders);


    } catch (error) {
        return res.json(error.message);
    }
}
async function listPreparingOrders(req, res) {

    try {

        const orders = await knex('preparingorder')
            .select('user_name as nome', 'products_description as pedido', 'quantities as quantidades', 'total_price as valor_total', 'id as id_pedido')



        return res.json(orders);


    } catch (error) {
        return res.json(error.message);
    }
}

async function preparingOrder(req, res) {
    const order = req.orderExist;
    const ordered = order[0];
    try {

        if (!ordered) {
            return res.status(404).json({ mensagem: "O pedido não existe" });
        }

        await knex('preparingorder').insert({ user_name: ordered.user_name, products_description: ordered.products_description, total_price: ordered.total_price, quantities: ordered.quantities });

        return res.status(200).json({
            mensagem: 'Pedido em preparo!',
            id_pedido: ordered.id,
            nome_usuario: ordered.user_name,
            produtos: ordered.products_description,
            quantidades: ordered.quantities,
            preco: ordered.total_price
        })
    } catch (error) {
        return res.json(error.message);
    }
}
module.exports = {
    createOrder,
    listOrders,
    preparingOrder,
    listPreparingOrders
}