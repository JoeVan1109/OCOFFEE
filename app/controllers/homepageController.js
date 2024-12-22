import dataMapper from '../dataMapper.js';

const homepageController = {
    homepage: async (req, res) => {
        try {
            const homePage = await dataMapper.homePage();
            res.status(200).render("homepage", { homePage });
        } catch (error) {
            res.status(404).render("error404");
            
        }
    }
};

export default homepageController;