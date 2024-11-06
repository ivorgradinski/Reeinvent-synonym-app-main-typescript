import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiLimiter from './utils/rateLimiter';
import indexRoutes from './routes/indexRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(apiLimiter);

app.use('/api', indexRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
