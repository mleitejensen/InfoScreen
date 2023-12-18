const { Router } = require('express');
const router = Router()
const { createElement, getElements } = require("../controllers/elementController")

router.post("/order/create", createElement)
router.get("/order", getElements)

module.exports = router