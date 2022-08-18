const express = require("express");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
  updateFavorite,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", validation(joiSchema), ctrlWrapper(add));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(updateById));

router.patch("/:contactId/favorite", validation(favoriteJoiSchema), ctrlWrapper(updateFavorite));

router.delete("/:contactId", ctrlWrapper(removeById));

module.exports = router;
