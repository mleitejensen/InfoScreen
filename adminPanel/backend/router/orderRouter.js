const { Router } = require('express');
const router = Router()
const { createElement, getElements, deleteElement, initializeMusic, uploadMusic } = require("../controllers/elementController")

router.get("/order", getElements)
router.post("/order/create", createElement)
router.post("/order/delete", deleteElement)
router.post("/order/music", initializeMusic)
router.post("/order/music/update", uploadMusic)

module.exports = router