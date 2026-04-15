import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';
import { PORT } from './config';
import { AppDataSource } from './data-source';
import { swaggerUi, swaggerSpec } from './config/swagger';
import housesRoutes from './routes/houses.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/houses', housesRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    // Start your Express app here
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });