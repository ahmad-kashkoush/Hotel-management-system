const express = require("express");
const cabinController=require("../controllers/cabinController")
const router = express.Router();
router
    .route('/')
    .get(cabinController.getCabins)
    .post(cabinController.insertCabin)
router.route("/:id")
    .get(cabinController.getCabinById)
    .patch(cabinController.updateCabin)
    .delete(cabinController.deleteCabin)

module.exports = router;
