import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import summaryRoutes from "./routes/summaryRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ResumePilot AI Backend is running');
});

app.use('/api/users', userRoutes);
app.use("/api/ai", summaryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});