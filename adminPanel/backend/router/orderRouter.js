const { Router } = require('express');
const router = Router()
const { createElement, getElements, deleteElement } = require("../controllers/elementController")

router.get("/order", getElements)
router.post("/order/create", createElement)
router.post("/order/delete", deleteElement)

module.exports = router