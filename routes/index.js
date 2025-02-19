const router = require('express').Router();

router.use('/', require('./htmlRoutes'));
router.use('/api', require('./apiRoutes'));

module.exports = router;



