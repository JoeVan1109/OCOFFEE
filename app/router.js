const express = require('express');
const homepageController = require('./controllers/homepageController');
const shoppageController = require('./controllers/shopPageController');
const productpageController = require('./controllers/productpageController');
const contactpageController = require('./controllers/contactpageController');


const router = express.Router();

router.get('/', homepageController.homepage);

router.get('/contact', contactpageController.renderEmailForm);
router.post('/send-email', contactpageController.sendEmail);

router.get('/shoppage', shoppageController.shoppage);
router.post('/shoppage/:filter', shoppageController.categoryPage);

router.get('/productpage/:id', productpageController.productPage);


module.exports = router;