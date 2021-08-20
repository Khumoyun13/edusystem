import Joi from "joi";

// export default Joi.object({
//   email: Joi.string()
//     .pattern(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     )
//     .required()
//     .error(Error("Email is invalid")),
// });

export default Joi.object({
  name: Joi.string().max(32).min(3).required().error(Error("Name is invalid")),
  email: Joi.string()
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required()
    .error(Error("Email is invalid")),
  password: Joi.string().min(6).max(16),
  bdate: Joi.date().error(Error("Birth date is invalid")).required(),
  gender: Joi.string()
    .valid("male", "female")
    .error(Error("Gender is invalid"))
    .required(),
  phone: Joi.string()
    // .pattern(/^9989[0123456789][0-9]{7}$/)
    .error(Error("Phone number is invalid")),
});
