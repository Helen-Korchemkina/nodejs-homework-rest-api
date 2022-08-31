const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ password: hashPassword, email, subscription, avatarURL });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
