const { Router } = require('express');
const router = Router()

router.get("/", (req, res) =>{
    res.send("Sending test message from localhost:9000/")
} )

module.exports = router