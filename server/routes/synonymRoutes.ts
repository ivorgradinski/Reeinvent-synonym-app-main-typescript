import express from 'express';
import synonymController from '../controllers/synonymController';
import { ADD_SYNONYM, SEARCH_SYNONYM } from '../constants/routes';
import { callbackErrorHandler } from '../utils/errorHandlers';

const router = express.Router();

router.post(ADD_SYNONYM, callbackErrorHandler(synonymController.addSynonym));
router.get(SEARCH_SYNONYM, callbackErrorHandler(synonymController.getSynonyms));

export default router;

