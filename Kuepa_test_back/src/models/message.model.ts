import * as mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatId: String,
    userId: { type: String, ref: 'User' },
    textMessage: String,
}, {
    timestamps: true
});

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel