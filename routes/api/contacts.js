const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
} = require("../../controllers/contacts");

const validateMiddleware = validation(contactSchema);
const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validateMiddleware, ctrlWrapper(add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(updateById));

router.delete("/:contactId", ctrlWrapper(removeById));

module.exports = router;
