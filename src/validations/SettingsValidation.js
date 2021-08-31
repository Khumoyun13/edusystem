import Joi from "joi";

export default Joi.object({
  code_time: Joi.number().error(Error("Code time is invalid")).min(60000),
  ban_time: Joi.number().error(Error("Ban time is invalid")).min(600000),
  code_attempts: Joi.number().error(Error("Code attempts is invalid")).min(1),
  attempts: Joi.number().error(Error("Attempts is invalid")).min(1)
});
