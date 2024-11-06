import express from 'express';
import synonymController from '../controllers/synonymController';
import { Routes } from '../constants/routes';
import { callbackErrorHandler } from '../utils/errorHandlers';

const router = express.Router();

router.post(Routes.ADD_SYNONYM, callbackErrorHandler(synonymController.addSynonym));
router.get(Routes.SEARCH_SYNONYM, callbackErrorHandler(synonymController.getSynonyms));

export default router;

