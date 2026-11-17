const {validationResult} = require("express-validator");

const checkValidation = (req, res, next) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
       return res.status(400).send({ errors: result.array() });
    }
    // Validación correcta. Sigue hacia la siguiente tarea
    next();
}

module.exports = checkValidation;