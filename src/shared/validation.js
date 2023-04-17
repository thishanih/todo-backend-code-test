import Joi from "joi";

////////////////////// Register User  //////////////////////////
export const registrationUserValidation = (data) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(2).required().email(),
    password: Joi.string().min(2).max(30).required(),
  });
  return userSchema.validate(data);
};
