import mongoose, { models, Schema } from "mongoose";

const feedbackSchema = new Schema({
    fullname: { type: String, required: [true, "Full name is required."], trim: true, minLength: [3, "Name must be larger than 3 characters"], maxLength: [50, "Name must be less than 50 characters"] },
    email: { type: String, required: [true, "Email is required."],  trim: true, match: [/.+\@.+\..+/, "Please enter a valid email address"]},
    message: { type: String, required: [true, "Feedback is required."] },
    date: {type: Date, default: Date.now},
});

const Feedback = models.Feedback || mongoose.model('Feedback', feedbackSchema)
export default Feedback;