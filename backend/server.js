import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import summaryRoutes from "./routes/summaryRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import experienceRoutes from './routes/experienceRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import fullResumeRoutes from './routes/fullResumeRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ResumePilot AI Backend is running');
});

app.use('/api/users', userRoutes);
app.use("/api/ai", summaryRoutes);
app.use("/api/ai", achievementRoutes);
app.use('/api/ai', experienceRoutes);
app.use('/api/ai', skillsRoutes);
app.use('/api/ai', projectRoutes);
app.use('/api/ai', fullResumeRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});