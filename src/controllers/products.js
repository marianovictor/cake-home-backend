const knex = require("../services/connection");



async function listProducts(req, res){

    try {
        const orders = await knex("products")
            .select("category_id as categories", knex.raw("ARRAY_AGG(description) as products"), knex.raw("ARRAY_AGG(id) as products_id"))
            .groupBy("category_id");


        return res.json(orders);
    } catch (error) {
        return res.json(error.message);
    }
}


module.exports = {
    listProducts
}