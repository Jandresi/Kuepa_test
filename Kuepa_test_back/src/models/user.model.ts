import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, minlength: 5, maxlength: 200, unique: true},
    name: {type: String, required: true, minlength: 5, maxlength: 100},
    password: {type: String, required: true, minlength: 8, maxlength: 1024},
    moderator: {type: Boolean, required: true}
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);
export default userModel