import Joi from "Joi";

export const fileUpload = Joi.object({
    headers: Joi.object({
        'content-type': Joi.string().valid(['application/pdf']).required(),
    }).unknown().required()
}).unknown()
