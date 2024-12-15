import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import fileRoute from './routes/files.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
const app = express();

await mongoose.connect(process.env.mongourl);

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/files', fileRoute);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.listen(process.env.port, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})