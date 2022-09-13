const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');

const { sendEmail } = require('../../helpers');
const { User } = require("../../models");

const signup = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ password: hashPassword, email, subscription, avatarURL, verificationToken });

  const mail = {
    to: email,
    subject: 'Welcome! Confirm Your Email',
    html: `<a target="_blank" href="http://localhost:3000/users/verify/:${verificationToken}">Confirm Email Address</a>`
}
  await sendEmail(mail);
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken
      },
    },
  });
};

module.exports = signup;
