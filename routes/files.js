import express from 'express';
import upload from '../middlewares/multer.js';
import { deleteFile, downloadFile, getFile, getFiles, shareFile, updateFile, uploadFile } from '../controllers/files.js';
const fileRoute = express.Router();

fileRoute.post('/upload', upload.single('file'), uploadFile);

fileRoute.get('/getall', getFiles);

fileRoute.get('/get/:id', getFile);

fileRoute.get('/download/:id', downloadFile);

fileRoute.post('/share/:id', shareFile);

fileRoute.delete('/delete/:id', deleteFile);

fileRoute.put('/update/:id', updateFile);

export default fileRoute;