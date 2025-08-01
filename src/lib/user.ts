import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: true },
    createdAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);
export default User;    