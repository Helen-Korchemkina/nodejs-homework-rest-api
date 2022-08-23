const { NotFound } = require("http-errors");

const { Contact } = require('../../models');

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
    if (!result) {
      throw new NotFound("missing field favorite");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
};

module.exports = updateFavorite;