import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: Schema.Types.String,
    medals: [{
        type: Schema.Types.ObjectId,
        ref: 'Medal'
    }]
}, {
    timestamps: true
});

export const Event = mongoose.model('Event', eventSchema);