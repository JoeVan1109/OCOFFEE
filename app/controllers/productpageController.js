const dataMapper = require("../dataMapper");

const productpageController = {
    productPage: async (req, res) => {


        const targetId = Number(req.params.id, 10);


        if (isNaN(targetId)) {

            return res.status(400).send('ID de produit invalide');
        }

        try {
            const product = await dataMapper.getOneProduct(targetId);

            if (!product) {

                return res.status(404).render("error404");
            }


            res.status(200).render("productpage", { product });

            

        } catch (error) {

            res.status(404).render("error404");
        }
    }
}

module.exports = productpageController;