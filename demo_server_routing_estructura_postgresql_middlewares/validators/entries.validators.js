const { body } = require("express-validator");

const validateCreateEntry = [
  body("title")
    .exists()
    .withMessage("Title of entry is required")
    .isString()
    .withMessage("Title should be string"),
  body("content")
    .exists()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content should be string")
    .isLength({ min: 10 })
    .withMessage("Content should be at least 10 characters"),
  body("email")
    .isEmail()
    .withMessage("Provide valid email"),
  body("category")
    .exists()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category should be string")
    .isLength({ min: 5 })
    .withMessage("Category at least 5 characters"),
];

module.exports = {
    validateCreateEntry,
    //validateDeleteEntry,
    //validateUpdateEntry
};
