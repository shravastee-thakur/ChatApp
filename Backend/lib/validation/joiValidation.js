import joi from "joi";

export const signUpValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().trim().min(3).max(30).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().min(6).max(14).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().min(6).max(14).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};
