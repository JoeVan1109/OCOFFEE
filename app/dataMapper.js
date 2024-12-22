import { query } from '../db.js';
import emailjs from '@emailjs/nodejs';

const dataMapper = {
    homePage: async () => {
        const sql = "SELECT * FROM produits";
        const result = await query(sql);
        return result.rows;
    },

    shoppage: async () => {
        const sql = "SELECT * FROM produits";
        const result = await query(sql);
        return result.rows;
    },

    getOneProduct: async (productId) => {
        const sql = `SELECT * FROM produits WHERE id = ${productId}`;
        const result = await query(sql);
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
            const result = await query(sql, values);
            return result.rows;
        } catch (error) {
            console.log(error);
        }
    }
};

export default dataMapper;