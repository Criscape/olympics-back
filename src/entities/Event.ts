import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: Schema.Types.String,
    sport: {
        type: Schema.Types.ObjectId,
        ref: 'Sport'
    },
    medals: [{
        type: Schema.Types.ObjectId,
        ref: 'Medal'
    }]
}, {
    timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);