// models/eventModel.js
import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDetails: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTags: { type: [String], required: true },
    helping: { type: [String], required: true },
    eventPoster: { type: String },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
