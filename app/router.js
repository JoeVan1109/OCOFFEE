import express from 'express';
import homepageController from './controllers/homepageController.js';
import shoppageController from './controllers/shopPageController.js';
import productpageController from './controllers/productpageController.js';
import contactpageController from './controllers/contactpageController.js';

const router = express.Router();

router.get('/', homepageController.homepage);

router.get('/contact', contactpageController.renderEmailForm);
router.post('/send-email', contactpageController.sendEmail);

router.get('/shoppage', shoppageController.shoppage);
router.post('/shoppage/:filter', shoppageController.categoryPage);

router.get('/productpage/:id', productpageController.productPage);

export default router;