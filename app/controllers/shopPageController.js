const dataMapper = require("../dataMapper");

const shoppageController = {

    shoppage: async (req, res) => {
        try {
            const shopPage = await dataMapper.shoppage();
            res.status(200).render("shoppage", { shopPage });

            
            
        } catch (error) {
            res.status(500).send(`Erreur côté serveur: ${error}`);
        }
    },

    categoryPage: async (req, res) => {
        try {

            const { filter } = req.params;

            const shopPage = await dataMapper.getProductByCategory(filter);

            res.status(200).render("shoppage", { shopPage });

        } catch (error) {
            res.status(404).render("error404");
        }
    }

}


module.exports = shoppageController;