const Joi = require("@hapi/joi");

module.exports = {
  addUserValidation: (data) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
  addPostValidation: (data) => {
    console.log('addPostValidation', data)
    const schema = Joi.object({
      userId: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      summary: Joi.string().optional(),
      category: Joi.string().optional(),
      thumbnail: Joi.string().optional(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
  addCategoryValidation: (data) => {
    console.log('addCategoryValidation', data)
    const schema = Joi.object({
      key: Joi.string().required(),
      title: Joi.string().required(),
      parentKey: Joi.string().required(),
      image: Joi.string().required(),
    }).options({ abortEarly: false });
    const { error, value } = schema.validate(data);
    return { error, value };
  },
};
