const express = require("express");

const { auth, validation, upload, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require('../../controllers');
const { owner: ctrlOwner } = require('../../controllers');

const { joiSchema } = require('../../models/user');

const router = express.Router();

router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup));

router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrlOwner.getCurrent));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrlOwner.updateAvatar));

module.exports = router;