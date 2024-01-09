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

        const userName = await knex('users').select("name").where("id", user_id).first();

        const ordered = await knex('cart').insert({ user_name: userName.name, products_description: orderedProducts, total_price: totalPrice, quantities: orderedProductsQuantities }).returning(["products_description", "quantities", "total_price"]);
        return res.json({
            cliente: userName,
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

module.exports = {
    createOrder,
    listOrders
}