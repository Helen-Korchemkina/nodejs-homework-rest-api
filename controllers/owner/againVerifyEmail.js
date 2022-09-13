const { sendEmail } = require("../../helpers");
const { BadRequest, NotFound } = require("http-errors");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
    }
    
  if (!email) {
    throw BadRequest("Missing required field email");
  }

  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  
  const verificationToken = uuidv4();
  const mail = {
    to: email,
    subject: "Welcome! Confirm Your Email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/:${verificationToken}">Confirm Email Address</a>`,
  };
    await sendEmail(mail);
    res.json({
        message: "Email verify resend"
    })
};

module.exports = verifyEmail;
