import { Request, Response } from 'express';
import synonymService from '../services/synonymService';
import { errors } from '../constants/errors';
import { addSynonymSchema, getSynonymSchema } from '../validators/synonymValidator';

export const addSynonym = async (req: Request, res: Response): Promise<void> => {
    const { error } = addSynonymSchema.validate(req.body);
    if (error) {
        throw errors.VALIDATION(error.details[0].message);
    }

    const { word, synonyms } = req.body;
    await synonymService.addSynonym(word, synonyms);
    res.status(201).json({ message: 'Synonyms added successfully' });
};

export const getSynonyms = async (req: Request, res: Response): Promise<void> => {
    const { error } = getSynonymSchema.validate(req.params);
    if (error) {
        throw errors.VALIDATION(error.details[0].message);
    }

    const { word } = req.params;
    const synonyms = await synonymService.getSynonyms(word);

    if (!synonyms) {
        throw errors.NOT_FOUND('Word not found');
    }

    res.status(200).json({ synonyms });
};

export default {
    addSynonym,
    getSynonyms,
};
