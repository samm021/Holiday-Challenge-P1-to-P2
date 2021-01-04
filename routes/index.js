const express = require('express');
const router = express.Router();
const customerRouter = require('./customer-router');

router.get('/', (req, res) => {
    res.render('landing');
});
router.use('/customers', customerRouter);

module.exports = router;