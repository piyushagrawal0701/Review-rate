const express = require("express");
const {
  createCompany,
  getCompanies,
  getCompanyById,
} = require("../controllers/companyController");
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.get("/", getCompanies);
router.get("/:id", getCompanyById);

router.post("/", upload.single("logo"), protect, createCompany);

module.exports = router;
