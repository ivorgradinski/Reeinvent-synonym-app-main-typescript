import * as Joi from 'joi';

const addSynonymSchema = Joi.object({
    word: Joi.string().min(1).required(),
    synonyms: Joi.array().items(Joi.string().min(1)).min(1).required()
});

const getSynonymSchema = Joi.object({
    word: Joi.string().min(1).required()
});

export default {
    addSynonymSchema,
    getSynonymSchema
};

