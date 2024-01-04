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

        order.forEach((product) => {
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
                orderedProducts.push(product.id);
                orderedProductsQuantities.push(product.quantidade)
            }
        })

        const ordered = await knex('cart').insert({ user_id: user_id, products_id: orderedProducts, total_price: totalPrice, quantities: orderedProductsQuantities }).returning(["products_id", "quantities", "total_price"]);
        return res.json({
            idCliente: user_id,
            carrinho: ordered,
            erros: wrongProducts
        })
    } catch (error) {
        return res.json(error.message);
    }
}

module.exports = { createOrder }