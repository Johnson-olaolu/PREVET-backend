const { addVetter } = require("../controllers/Vetter.controller")

const router = require("express").Router()

router.post("/", addVetter)
router.post("/:vetterId")

module.exports = router