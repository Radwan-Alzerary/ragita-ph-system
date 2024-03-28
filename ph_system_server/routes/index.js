const router = require('express').Router();

router.use('/', require('./routes'));
router.use('/categories', require('./categories'));
router.use('/outfitters', require('./outfitters'));
router.use('/products', require('./product'));
// router.use('/invoice', require('./invoice'));

router.use('/packages', require('./package'));
router.use('/manufactor', require('./manufactory'));
router.use('/storges', require('./storges'));
router.use('/requestqueue', require('./requestQueue'));
router.use('/paymentype', require('./paymentType'));
router.use('/costemers', require('./costemers'));
router.use('/invoice', require('./invoice'));


// router.use('/costemers', require('./costemers'));
router.use('/', require('./routes'));

module.exports = router;