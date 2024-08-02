const dataMapper = require("../dataMapper");

const contactpageController = {
    renderEmailForm: (req, res) => {
        res.render('contact');
    },

    sendEmail: async (req, res) => {
        try {
            const { name, email, message } = req.body;
            const templateParams = { name, email, message };
            
            const result = await dataMapper.sendEmail(templateParams);
            res.json({ success: true, message: 'Email envoyé avec succès', result });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email', error: error.message });
        }
    }
}

module.exports = contactpageController;