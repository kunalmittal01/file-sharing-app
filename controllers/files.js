import axios from "axios";
import { uploadImage } from "../middlewares/cloudinary.js";
import File from "../models/files.js";
import { sendFileLink } from "../middlewares/nodemailer.js";

export const uploadFile = async(req,res) => {
    const file = {
        path: await uploadImage(req.file),
        filename: req.file.originalname,
        size: req.file.size,
        sender: req.body.sender || '',
        receiver: req.body.receiver || ''
    }
    if(!file) {
        return res.status(400).json({
            message: "No file provided"
        });
    }
    try {
        const uploadedFile = new File(file);
        uploadedFile.save()
        res.status(201).json({
            message: "File uploaded successfully",
            file: uploadedFile
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error uploading file'
        });
    }
    console.log(req.file);
    console.log(req.body);
    
} 

export const getFiles = async(req, res) => {
    try {
        const files = await File.find();
        res.json({
            message: 'success',
            files: files
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error getting files'
        });
    }
}

export const getFile = async(req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if(!file) return res.status(404).json({message: 'File not found'});
        res.json({
            message: 'Success',
            file: file
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error getting file'
        });
    }
}

export const downloadFile = async(req, res) => {
    const file = await File.findById(req.params.id);

    if(!file) return res.status(404).json({message: 'File not found'});
    try {
        const response = await axios({
            method: 'GET',
            url: file.path,
            responseType: 'stream',
        });

        // Set the headers for downloading
        res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
        res.setHeader('Content-Type', response.headers['content-type']);

        // Pipe the file stream to the response
        response.data.pipe(res);

    }
    catch (err) {
        res.status(500).json({
            message: 'Error downloading file'
        });
    }   
}

export const shareFile = async(req, res) => {
    const { receiver } = req.body;
    const link = `${process.env.backend_url}/api/files/download/${req.params.id}`;
    try {
        await sendFileLink(receiver,link);
        res.json({
            message: 'File shared successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error sharing file'
        });
    }
}

export const deleteFile = async(req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if(!file) return res.status(404).json({message: 'File not found'});
        res.json({
            message: 'File deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error deleting file'
        });
    }
}

export const updateFile = async(req, res) => {
    try {
        const file = await File.findByIdAndUpdate(req.params.id, req.body);
        if(!file) return res.status(404).json({message: 'File not found'});
        res.json({
            message: 'File updated successfully',
            file: file
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error updating file'
        });
    }
}