const express = require('express');
const router = express.Router();
const controller = require('../footercontent/footerContentController');

router.get('', controller.getFooterContent);
router.post('', controller.updateFooterContent);

module.exports = router;
