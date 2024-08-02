const client = require('./utils/client');

const emailjs = require('@emailjs/nodejs');

const dataMapper = {

    homePage: async () => {
        const sql = "SELECT * FROM produits";

        const result = await client.query(sql);

        return result.rows;
    },

    shoppage: async () => {
        const sql = "SELECT * FROM produits";

        const result = await client.query(sql);

        return result.rows;
    },

    getOneProduct: async (productId) => {
        const sql = `SELECT * FROM produits WHERE id = ${productId}`;

        

        const result = await client.query(sql);

        return result.rows[0];
    },

    sendEmail: async (templateParams) => {
        try {
            const result = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
            );
            return result;
        } catch (error) {
            console.error('Erreur :', error);
            throw error;
        }
    },

    getProductByCategory: async (filter) => {
        try {
            const sql = 'SELECT * FROM produits WHERE type ILIKE $1 ORDER BY id';
            const values = [`%${filter}%`];
    
    
            const result = await client.query(sql, values);
            return result.rows;
        } catch (error) {
            
            throw error;
        }
    }

}

module.exports = dataMapper;