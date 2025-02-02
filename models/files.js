import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    sender: {
        type: 'String',
        required: false
    },
    receiver: {
        type: 'String',
        required: false
    }
})

const File = mongoose.model('File', fileSchema);
export default File;