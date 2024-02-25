const { Router } = require('express');
const router = Router()
const { createElement, getElements, deleteElement, updateElement, moveOrderOfElement } = require("../controllers/elementController")

router.get("/order", getElements)
router.post("/order/create", createElement)
router.delete("/order/delete", deleteElement)
router.patch("/order/update", updateElement)
router.patch("/order/update/index", moveOrderOfElement)

module.exports = router