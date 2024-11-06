import express from 'express';
import synonymRoutes from './synonymRoutes';

const router = express.Router();

router.use('/synonyms', synonymRoutes);

export default router;

