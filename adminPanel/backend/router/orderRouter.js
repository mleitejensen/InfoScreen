const { Router } = require('express');
const router = Router()
const { createElement, getElements, deleteElement, updateElement } = require("../controllers/elementController")

router.get("/order", getElements)
router.post("/order/create", createElement)
router.delete("/order/delete", deleteElement)
router.post("/order/update", updateElement)

module.exports = router