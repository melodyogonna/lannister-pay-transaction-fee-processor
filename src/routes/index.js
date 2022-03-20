const router = require("express").Router();

const feeControllers = require("../controllers");

router.post("/fee", feeControllers.parseFees);
router.post(
  "/compute-transaction-fee",
  feeControllers.calculateTransactionFees
);

module.exports = router;
